import fs from "node:fs";
import path from "node:path";

const REPO_ROOT = path.resolve(process.cwd(), "../..");

const CATEGORIES = [
  { id: "concepts", label: "Concepts", dir: "concepts" },
  { id: "ideas", label: "Ideas", dir: "ideas" },
  { id: "threats", label: "Threats", dir: "threats" },
  { id: "example-systems", label: "Example Systems", dir: "example-systems" },
];

const CATEGORY_MAP = Object.fromEntries(CATEGORIES.map((c) => [c.id, c]));

export function getCategories() {
  return CATEGORIES;
}

export function getCategory(id) {
  return CATEGORY_MAP[id];
}

export function isValidCategory(id) {
  return id in CATEGORY_MAP;
}

function extractTitle(markdown) {
  const match = markdown.match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : null;
}

export function listNotes(categoryId) {
  const category = CATEGORY_MAP[categoryId];
  if (!category) return [];

  const dir = path.join(REPO_ROOT, category.dir);
  const files = fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md") && f !== "index.md");

  return files
    .map((file) => {
      const slug = file.replace(/\.md$/, "");
      const content = fs.readFileSync(path.join(dir, file), "utf-8");
      const title = extractTitle(content) || slug;
      return { slug, title };
    })
    .sort((a, b) => a.title.localeCompare(b.title));
}

export function getNote(categoryId, slug) {
  const category = CATEGORY_MAP[categoryId];
  if (!category) return null;

  const filePath = path.join(REPO_ROOT, category.dir, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const content = fs.readFileSync(filePath, "utf-8");
  const title = extractTitle(content) || slug;
  return { slug, title, content, categoryId };
}
