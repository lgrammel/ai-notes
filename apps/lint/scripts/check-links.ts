#!/usr/bin/env node

import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { pathToFileURL } from "url";
import markdownLinkCheck from "markdown-link-check";

const configPath = resolve(process.cwd(), ".markdown-link-check.json");
let config: Record<string, unknown> = {};
try {
  config = JSON.parse(readFileSync(configPath, "utf-8"));
} catch {
  // proceed without config
}

const files = process.argv.slice(2);

if (files.length === 0) {
  console.error("Usage: check-links.ts <file1.md> [file2.md] ...");
  process.exit(1);
}

let deadCount = 0;
let checkedCount = 0;
let fileCount = 0;

interface LinkResult {
  status: string;
  statusCode?: number;
  link: string;
}

function checkFile(file: string): Promise<void> {
  return new Promise((resolvePromise, reject) => {
    let markdown: string;
    try {
      markdown = readFileSync(file, "utf-8");
    } catch (err) {
      reject(
        new Error(
          `Cannot read ${file}: ${err instanceof Error ? err.message : err}`
        )
      );
      return;
    }

    const baseUrl = pathToFileURL(resolve(dirname(file))) + "/";
    const opts = { ...config, baseUrl };

    markdownLinkCheck(
      markdown,
      opts,
      (err: Error | null, results: LinkResult[]) => {
        if (err) {
          reject(err);
          return;
        }

        fileCount++;
        const dead = results.filter((r) => r.status === "dead");
        checkedCount += results.length;
        deadCount += dead.length;

        for (const r of dead) {
          const status =
            r.statusCode != null ? ` (status: ${r.statusCode})` : "";
          console.error(`${file}: ${r.link}${status}`);
        }

        resolvePromise();
      }
    );
  });
}

async function run(): Promise<void> {
  for (const file of files) {
    await checkFile(file);
  }

  if (deadCount > 0) {
    console.error(
      `\nLink check failed: ${deadCount} dead link(s) found across ${fileCount} file(s) (${checkedCount} links checked).`
    );
    process.exit(1);
  }

  console.log(
    `Link check passed: ${checkedCount} link(s) checked across ${fileCount} file(s).`
  );
}

run().catch((err: unknown) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
