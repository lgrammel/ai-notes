import { error } from "@sveltejs/kit";
import {
  getCategories,
  getCategory,
  isValidCategory,
  listNotes,
} from "$lib/content";
import type { EntryGenerator, PageServerLoad } from "./$types";

export const load: PageServerLoad = ({ params }) => {
  const { category } = params;

  if (!isValidCategory(category)) {
    throw error(404, "Category not found");
  }

  const categoryInfo = getCategory(category);
  const notes = listNotes(category);

  return { category: categoryInfo, notes };
};

export const entries: EntryGenerator = () => {
  return getCategories().map((c) => ({ category: c.id }));
};
