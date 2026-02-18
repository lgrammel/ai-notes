import type { NoteSummary } from "./content";

export interface SearchResult {
  id: string;
  label: string;
  notes: NoteSummary[];
}

export interface Search {
  search(query: string): SearchResult[];
}

export class TitleSearch implements Search {
  private categories: SearchResult[];

  constructor(categories: SearchResult[]) {
    this.categories = categories;
  }

  search(query: string): SearchResult[] {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return this.categories
      .map((category) => ({
        ...category,
        notes: category.notes.filter((note) =>
          note.title.toLowerCase().includes(q)
        ),
      }))
      .filter((category) => category.notes.length > 0);
  }
}
