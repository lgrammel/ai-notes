import { buildGraph } from "$lib/graph.js";

export function load() {
  const { nodes, edges } = buildGraph();
  return { nodes, edges };
}
