import path from "node:path";
import { getCategories, getNote, listNotes } from "./content";

export interface GraphNode {
  id: string;
  title: string;
  category: string;
}

export interface GraphEdge {
  source: string;
  target: string;
}

/**
 * Resolve a relative markdown link to a node ID (category/slug).
 * Reuses the same resolution logic as markdown.js.
 */
function resolveLink(href: string, sourceCategory: string): string | null {
  if (
    !href ||
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("#")
  ) {
    return null;
  }

  const sourcePath = `/${sourceCategory}/current`;
  const resolved = path.posix.resolve(path.posix.dirname(sourcePath), href);

  let cleaned = resolved.replace(/\.md$/, "");

  if (cleaned.endsWith("/index")) {
    return null;
  }

  // Remove leading slash to get node ID format: "concepts/llm"
  return cleaned.startsWith("/") ? cleaned.slice(1) : cleaned;
}

/**
 * Extract all relative markdown links from content.
 * Returns an array of raw href strings.
 */
function extractLinks(content: string): string[] {
  const linkRegex = /\[([^\]]*)\]\(([^)]+)\)/g;
  const hrefs = [];
  let match;
  while ((match = linkRegex.exec(content)) !== null) {
    hrefs.push(match[2]);
  }
  return hrefs;
}

/**
 * Build the full graph of nodes and edges from all markdown notes.
 */
export function buildGraph(): { nodes: GraphNode[]; edges: GraphEdge[] } {
  const categories = getCategories();
  const nodes: GraphNode[] = [];
  const nodeIds = new Set<string>();

  // Collect all nodes
  for (const category of categories) {
    const notes = listNotes(category.id);
    for (const note of notes) {
      const id = `${category.id}/${note.slug}`;
      nodes.push({ id, title: note.title, category: category.id });
      nodeIds.add(id);
    }
  }

  // Collect edges by reading note content and extracting links
  const edgeSet = new Set<string>();
  const edges: GraphEdge[] = [];

  for (const category of categories) {
    const notes = listNotes(category.id);
    for (const note of notes) {
      const full = getNote(category.id, note.slug);
      if (!full) continue;

      const sourceId = `${category.id}/${note.slug}`;
      const hrefs = extractLinks(full.content);

      for (const href of hrefs) {
        const targetId = resolveLink(href, category.id);
        if (!targetId || !nodeIds.has(targetId)) continue;
        if (targetId === sourceId) continue;

        const key = `${sourceId}->${targetId}`;
        if (edgeSet.has(key)) continue;
        edgeSet.add(key);

        edges.push({ source: sourceId, target: targetId });
      }
    }
  }

  return { nodes, edges };
}
