import { getCategories, listNotes } from "$lib/content";
import type { LayoutServerLoad } from "./$types";

export const prerender = true;

export const load: LayoutServerLoad = () => {
  const categories = getCategories().map((category) => ({
    ...category,
    notes: listNotes(category.id),
  }));

  return { categories };
};
