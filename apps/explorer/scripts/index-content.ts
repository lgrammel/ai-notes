import fs from "node:fs";
import path from "node:path";
import { tokenize } from "../src/lib/tokenize.js";

const REPO_ROOT = path.resolve(process.cwd(), "../..");
const CATEGORIES = ["concepts", "ideas", "threats", "example-systems"];

interface DocEntry {
  category: string;
  slug: string;
  title: string;
  length: number;
  tf: Record<string, number>;
}

interface SearchIndex {
  avgDocLength: number;
  docs: DocEntry[];
  idf: Record<string, number>;
}

function extractTitle(markdown: string): string {
  const match = markdown.match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : "";
}

function main(): void {
  const docs: DocEntry[] = [];
  const df: Record<string, number> = {};

  for (const category of CATEGORIES) {
    const dir = path.join(REPO_ROOT, category);
    const files = fs
      .readdirSync(dir)
      .filter((f) => f.endsWith(".md") && f !== "index.md");

    for (const file of files) {
      const content = fs.readFileSync(path.join(dir, file), "utf-8");
      const slug = file.replace(/\.md$/, "");
      const title = extractTitle(content) || slug;
      const tokens = tokenize(content);

      const tf: Record<string, number> = {};
      for (const token of tokens) {
        tf[token] = (tf[token] || 0) + 1;
      }

      for (const term of Object.keys(tf)) {
        df[term] = (df[term] || 0) + 1;
      }

      docs.push({ category, slug, title, length: tokens.length, tf });
    }
  }

  const N = docs.length;
  const idf: Record<string, number> = {};
  for (const [term, n] of Object.entries(df)) {
    idf[term] = Math.log((N - n + 0.5) / (n + 0.5) + 1);
  }

  const avgDocLength = docs.reduce((sum, d) => sum + d.length, 0) / N;

  const index: SearchIndex = { avgDocLength, docs, idf };

  const outDir = path.join(process.cwd(), "static");
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const outPath = path.join(outDir, "search-index.json");
  fs.writeFileSync(outPath, JSON.stringify(index));

  console.log(
    `Search index: ${docs.length} docs, ${Object.keys(idf).length} terms → ${outPath}`
  );
}

main();
