import fs from "node:fs";
import path from "node:path";

const REPO_ROOT = path.resolve(process.cwd(), "../..");

export interface Category {
  id: "concepts" | "ideas" | "threats" | "example-systems";
  label: string;
  dir: string;
}

export interface NoteSummary {
  slug: string;
  title: string;
}

export interface Note extends NoteSummary {
  content: string;
  categoryId: string;
}

const CATEGORIES: Category[] = [
  { id: "concepts", label: "Concepts", dir: "concepts" },
  { id: "ideas", label: "Ideas", dir: "ideas" },
  { id: "threats", label: "Threats", dir: "threats" },
  { id: "example-systems", label: "Example Systems", dir: "example-systems" },
];

const CATEGORY_MAP: Record<string, Category> = Object.fromEntries(
  CATEGORIES.map((c) => [c.id, c])
);

export function getCategories(): Category[] {
  return CATEGORIES;
}

export function getCategory(id: Category["id"]): Category {
  return CATEGORY_MAP[id];
}

export function isValidCategory(id: string): id is Category["id"] {
  return id in CATEGORY_MAP;
}

function extractTitle(markdown: string): string | null {
  const match = markdown.match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : null;
}

export function listNotes(categoryId: string): NoteSummary[] {
  const category = CATEGORY_MAP[categoryId];
  if (!category) return [];

  const dir = path.join(REPO_ROOT, category.dir);
  const files = fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md") && f !== "index.md");

  return files
    .map((file): NoteSummary => {
      const slug = file.replace(/\.md$/, "");
      const content = fs.readFileSync(path.join(dir, file), "utf-8");
      const title = extractTitle(content) || slug;
      return { slug, title };
    })
    .sort((a, b) => a.title.localeCompare(b.title));
}

export function getNote(categoryId: string, slug: string): Note | null {
  const category = CATEGORY_MAP[categoryId];
  if (!category) return null;

  const filePath = path.join(REPO_ROOT, category.dir, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const content = fs.readFileSync(filePath, "utf-8");
  const title = extractTitle(content) || slug;
  return { slug, title, content, categoryId };
}
