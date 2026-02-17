import { getCategories, listNotes } from "$lib/content.js";

export function load() {
  const categories = getCategories().map((category) => ({
    ...category,
    notes: listNotes(category.id),
  }));

  return { categories };
}
