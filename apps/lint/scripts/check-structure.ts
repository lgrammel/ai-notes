#!/usr/bin/env node

import { readFileSync } from "fs";
import path from "node:path";

const KEBAB_CASE = /^[a-z0-9]+(-[a-z0-9]+)*\.md$/;

const CONTENT_DIRS = new Set([
  "concepts",
  "ideas",
  "threats",
  "example-systems",
]);

type NoteType = "concepts" | "ideas" | "threats" | "example-systems";

const SECTION_ORDER: Record<NoteType, string[]> = {
  concepts: ["Details", "Examples", "Synonyms", "External references"],
  ideas: [
    "Details",
    "Examples",
    "Counterarguments",
    "Confidence",
    "Synonyms",
    "External references",
  ],
  threats: [
    "Details",
    "Examples",
    "Mitigations",
    "Synonyms",
    "External references",
  ],
  "example-systems": [
    "Details",
    "Capabilities",
    "Trust analysis",
    "Interaction effects",
    "Threats",
    "Examples",
    "Synonyms",
    "External references",
  ],
};

const REQUIRED_SECTIONS: Record<NoteType, string[]> = {
  concepts: [],
  ideas: ["Confidence"],
  threats: [],
  "example-systems": [
    "Capabilities",
    "Trust analysis",
    "Interaction effects",
    "Threats",
  ],
};

const files = process.argv.slice(2);

if (files.length === 0) {
  console.error("Usage: check-structure.ts <file1.md> [file2.md] ...");
  process.exit(1);
}

let errorCount = 0;
let checkedCount = 0;

function error(file: string, line: number | null, message: string): void {
  const loc = line != null ? `:${line}` : "";
  console.error(`${file}${loc}: ${message}`);
  errorCount++;
}

function getNoteType(file: string): NoteType | null {
  const parts = path.dirname(file).split(path.sep);
  const dirName = parts[parts.length - 1];
  if (CONTENT_DIRS.has(dirName)) return dirName as NoteType;
  return null;
}

interface Heading {
  name: string;
  line: number;
}

function checkFile(file: string): void {
  const fileName = path.basename(file);

  if (fileName === "index.md") return;

  const noteType = getNoteType(file);
  if (noteType == null) return;

  checkedCount++;

  const content = readFileSync(file, "utf-8");
  const lines = content.split("\n");

  if (!KEBAB_CASE.test(fileName)) {
    error(file, null, `Filename "${fileName}" is not kebab-case`);
  }

  if (lines.length === 0 || !lines[0].startsWith("# ")) {
    error(file, 1, "First line must be an H1 title (# Title)");
  }

  let firstH2Idx = lines.length;
  for (let i = 1; i < lines.length; i++) {
    if (lines[i].startsWith("## ")) {
      firstH2Idx = i;
      break;
    }
  }

  const hasSummary = lines
    .slice(1, firstH2Idx)
    .some((l) => l.trim().length > 0 && !l.startsWith("#"));
  if (!hasSummary) {
    error(
      file,
      2,
      "Executive summary missing: need a non-empty paragraph between H1 and first ## heading"
    );
  }

  const h2Headings: Heading[] = [];
  const h3Headings: Heading[] = [];
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].startsWith("## ")) {
      h2Headings.push({ name: lines[i].slice(3).trim(), line: i + 1 });
    } else if (lines[i].startsWith("### ")) {
      h3Headings.push({ name: lines[i].slice(4).trim(), line: i + 1 });
    }
  }

  const allowedOrder = SECTION_ORDER[noteType];
  const allowedSet = new Set(allowedOrder);
  const h2Names = h2Headings.map((h) => h.name);

  for (const h of h2Headings) {
    if (!allowedSet.has(h.name)) {
      error(
        file,
        h.line,
        `Unexpected section "## ${h.name}" for ${noteType} note`
      );
    }
  }

  const recognizedH2 = h2Headings.filter((h) => allowedSet.has(h.name));
  for (let i = 1; i < recognizedH2.length; i++) {
    const prevIdx = allowedOrder.indexOf(recognizedH2[i - 1].name);
    const currIdx = allowedOrder.indexOf(recognizedH2[i].name);
    if (currIdx <= prevIdx) {
      error(
        file,
        recognizedH2[i].line,
        `Section "## ${recognizedH2[i].name}" is out of order (must come after "## ${recognizedH2[i - 1].name}")`
      );
    }
  }

  const required = REQUIRED_SECTIONS[noteType];
  for (const section of required) {
    if (!h2Names.includes(section)) {
      error(
        file,
        null,
        `Required section "## ${section}" is missing for ${noteType} note`
      );
    }
  }

  const detailsH2 = h2Headings.find((h) => h.name === "Details");
  let detailsStartLine = -1;
  let detailsEndLine = -1;
  if (detailsH2) {
    detailsStartLine = detailsH2.line;
    const detailsIdx = h2Headings.indexOf(detailsH2);
    detailsEndLine =
      detailsIdx + 1 < h2Headings.length
        ? h2Headings[detailsIdx + 1].line
        : lines.length + 1;
  }

  for (const h3 of h3Headings) {
    if (
      detailsStartLine === -1 ||
      h3.line <= detailsStartLine ||
      h3.line >= detailsEndLine
    ) {
      error(
        file,
        h3.line,
        `H3 subsection "### ${h3.name}" is only allowed under ## Details`
      );
    }
  }

  const synonymsH2 = h2Headings.find((h) => h.name === "Synonyms");
  if (synonymsH2) {
    const synContentStart = synonymsH2.line;
    const synIdx = h2Headings.indexOf(synonymsH2);
    const synContentEnd =
      synIdx + 1 < h2Headings.length
        ? h2Headings[synIdx + 1].line - 1
        : lines.length;

    for (let i = synContentStart; i < synContentEnd; i++) {
      if (/\[[^\]]+\]\([^)]+\)/.test(lines[i])) {
        error(
          file,
          i + 1,
          "Synonyms section must be plain text (no markdown links)"
        );
      }
    }
  }

  const extRefH2 = h2Headings.find((h) => h.name === "External references");
  if (extRefH2) {
    const extContentStart = extRefH2.line;
    const extIdx = h2Headings.indexOf(extRefH2);
    const extContentEnd =
      extIdx + 1 < h2Headings.length
        ? h2Headings[extIdx + 1].line - 1
        : lines.length;

    for (let i = extContentStart; i < extContentEnd; i++) {
      const linkMatches = lines[i].matchAll(/\[[^\]]+\]\(([^)]+)\)/g);
      for (const m of linkMatches) {
        const url = m[1];
        if (!url.startsWith("http://") && !url.startsWith("https://")) {
          error(
            file,
            i + 1,
            `External references must use external URLs only, found relative link: ${url}`
          );
        }
      }
    }
  }
}

for (const file of files) {
  checkFile(file);
}

if (errorCount > 0) {
  console.error(
    `\nStructure check failed: ${errorCount} error(s) in ${checkedCount} file(s).`
  );
  process.exit(1);
}

console.log(`Structure check passed: ${checkedCount} file(s) checked.`);
