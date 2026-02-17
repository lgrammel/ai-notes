import { error } from "@sveltejs/kit";
import { isValidCategory, getCategory, listNotes } from "$lib/content.js";
import { getCategories } from "$lib/content.js";

export function load({ params }) {
  const { category } = params;

  if (!isValidCategory(category)) {
    error(404, "Category not found");
  }

  const categoryInfo = getCategory(category);
  const notes = listNotes(category);

  return { category: categoryInfo, notes };
}

export function entries() {
  return getCategories().map((c) => ({ category: c.id }));
}
