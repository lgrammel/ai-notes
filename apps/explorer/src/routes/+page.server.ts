import { getCategories, listNotes } from "$lib/content";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = () => {
  const categories = getCategories().map((category) => ({
    ...category,
    count: listNotes(category.id).length,
  }));

  return { categories };
};
