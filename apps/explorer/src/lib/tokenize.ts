const STOP_WORDS = new Set([
  "a",
  "about",
  "an",
  "and",
  "are",
  "as",
  "at",
  "be",
  "been",
  "but",
  "by",
  "can",
  "do",
  "each",
  "for",
  "from",
  "had",
  "has",
  "have",
  "he",
  "her",
  "his",
  "how",
  "if",
  "in",
  "into",
  "is",
  "it",
  "its",
  "may",
  "more",
  "most",
  "no",
  "not",
  "of",
  "on",
  "or",
  "other",
  "our",
  "own",
  "say",
  "she",
  "so",
  "some",
  "such",
  "than",
  "that",
  "the",
  "their",
  "them",
  "then",
  "there",
  "these",
  "they",
  "this",
  "those",
  "through",
  "to",
  "too",
  "us",
  "use",
  "used",
  "using",
  "very",
  "was",
  "we",
  "were",
  "what",
  "when",
  "where",
  "which",
  "while",
  "who",
  "whom",
  "why",
  "will",
  "with",
  "would",
  "you",
  "your",
]);

export function stripMarkdown(text: string): string {
  return (
    text
      .replace(/```[\s\S]*?```/g, " ")
      .replace(/`[^`]+`/g, " ")
      .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
      // heading markers, emphasis, table pipes, horizontal rules
      .replace(/^#{1,6}\s+/gm, "")
      .replace(/[*_~]+/g, " ")
      .replace(/\|/g, " ")
      .replace(/^-{3,}/gm, " ")
      .replace(/^\s*[-*+]\s+/gm, " ")
      .replace(/^\s*\d+\.\s+/gm, " ")
      .replace(/^\s*>\s+/gm, " ")
  );
}

export function tokenize(text: string): string[] {
  const stripped = stripMarkdown(text);
  return stripped
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((token) => token.length >= 2 && !STOP_WORDS.has(token));
}
