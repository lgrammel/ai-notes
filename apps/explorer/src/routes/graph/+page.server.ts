import { buildGraph } from "$lib/graph";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = () => {
  const { nodes, edges } = buildGraph();
  return { nodes, edges };
};
