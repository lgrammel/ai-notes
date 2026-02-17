import { error } from "@sveltejs/kit";
import {
  isValidCategory,
  getCategory,
  getNote,
  listNotes,
  getCategories,
} from "$lib/content.js";
import { renderMarkdown } from "$lib/markdown.js";

export function load({ params }) {
  const { category, slug } = params;

  if (!isValidCategory(category)) {
    error(404, "Category not found");
  }

  const note = getNote(category, slug);
  if (!note) {
    error(404, "Note not found");
  }

  const categoryInfo = getCategory(category);
  const html = renderMarkdown(note.content, category);

  return {
    category: categoryInfo,
    title: note.title,
    slug: note.slug,
    html,
  };
}

export function entries() {
  const entries = [];
  for (const cat of getCategories()) {
    for (const note of listNotes(cat.id)) {
      entries.push({ category: cat.id, slug: note.slug });
    }
  }
  return entries;
}
