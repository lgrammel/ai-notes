import { error } from "@sveltejs/kit";
import {
  getCategories,
  isValidCategory,
  getCategory,
  getNote,
  listNotes,
} from "$lib/content";
import { renderMarkdown } from "$lib/markdown";
import type { EntryGenerator, PageServerLoad } from "./$types";

export const load: PageServerLoad = ({ params }) => {
  const { category, slug } = params;

  if (!isValidCategory(category)) {
    throw error(404, "Category not found");
  }

  const note = getNote(category, slug);
  if (!note) {
    throw error(404, "Note not found");
  }

  const categoryInfo = getCategory(category);
  const html = renderMarkdown(note.content, category);

  return {
    category: categoryInfo,
    title: note.title,
    slug: note.slug,
    html,
  };
};

export const entries: EntryGenerator = () => {
  const entries = [];
  for (const cat of getCategories()) {
    for (const note of listNotes(cat.id)) {
      entries.push({ category: cat.id, slug: note.slug });
    }
  }
  return entries;
};
