import { getCategories, listNotes } from "$lib/content.js";

export function load() {
  const categories = getCategories().map((category) => ({
    ...category,
    count: listNotes(category.id).length,
  }));

  return { categories };
}
