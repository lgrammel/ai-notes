import { tokenize } from "./tokenize";

export interface SearchIndex {
  avgDocLength: number;
  docs: Array<{
    category: string;
    slug: string;
    title: string;
    length: number;
    tf: Record<string, number>;
  }>;
  idf: Record<string, number>;
}

export interface BM25Result {
  category: string;
  slug: string;
  title: string;
  score: number;
}

const K1 = 1.2;
const B = 0.75;

export class BM25Search {
  private index: SearchIndex;

  constructor(index: SearchIndex) {
    this.index = index;
  }

  search(query: string): BM25Result[] {
    const queryTerms = tokenize(query);
    if (queryTerms.length === 0) return [];

    const { avgDocLength, docs, idf } = this.index;
    const results: BM25Result[] = [];

    for (const doc of docs) {
      let score = 0;
      for (const term of queryTerms) {
        const tf = doc.tf[term] ?? 0;
        if (tf === 0) continue;
        const termIdf = idf[term] ?? 0;
        score +=
          termIdf *
          ((tf * (K1 + 1)) /
            (tf + K1 * (1 - B + B * (doc.length / avgDocLength))));
      }
      if (score > 0) {
        results.push({
          category: doc.category,
          slug: doc.slug,
          title: doc.title,
          score,
        });
      }
    }

    return results.sort((a, b) => b.score - a.score);
  }
}
