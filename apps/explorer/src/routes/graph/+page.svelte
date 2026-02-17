<script>
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import * as d3 from "d3";

  let { data } = $props();

  const CATEGORY_COLORS = {
    concepts: { light: "#0969da", dark: "#58a6ff" },
    ideas: { light: "#8250df", dark: "#d2a8ff" },
    threats: { light: "#cf222e", dark: "#ff7b72" },
    "example-systems": { light: "#1a7f37", dark: "#3fb950" },
  };

  const CATEGORY_LABELS = {
    concepts: "Concepts",
    ideas: "Ideas",
    threats: "Threats",
    "example-systems": "Example Systems",
  };

  let container;
  let tooltip;

  onMount(() => {
    const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const colorMode = isDark ? "dark" : "light";

    const nodes = data.nodes.map((d) => ({ ...d }));
    const edges = data.edges.map((d) => ({ ...d }));

    // Count connections per node for radius scaling
    const connectionCount = new Map();
    for (const node of nodes) {
      connectionCount.set(node.id, 0);
    }
    for (const edge of edges) {
      connectionCount.set(
        edge.source,
        (connectionCount.get(edge.source) || 0) + 1,
      );
      connectionCount.set(
        edge.target,
        (connectionCount.get(edge.target) || 0) + 1,
      );
    }

    function nodeRadius(id) {
      const count = connectionCount.get(id) || 0;
      return Math.max(4, Math.min(16, 4 + Math.sqrt(count) * 2));
    }

    const rect = container.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const svg = d3
      .select(container)
      .append("svg")
      .attr("width", "100%")
      .attr("height", "100%")
      .attr("viewBox", [0, 0, width, height]);

    const g = svg.append("g");

    // Zoom behavior
    const zoom = d3
      .zoom()
      .scaleExtent([0.1, 8])
      .on("zoom", (event) => {
        g.attr("transform", event.transform);
        // Show/hide labels based on zoom level
        const scale = event.transform.k;
        g.selectAll(".node-label").attr("display", scale > 0.6 ? null : "none");
      });

    svg.call(zoom);

    // Force simulation
    const simulation = d3
      .forceSimulation(nodes)
      .force(
        "link",
        d3
          .forceLink(edges)
          .id((d) => d.id)
          .distance(80),
      )
      .force("charge", d3.forceManyBody().strength(-120))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force(
        "collision",
        d3.forceCollide().radius((d) => nodeRadius(d.id) + 2),
      );

    // Draw edges
    const link = g
      .append("g")
      .attr("class", "graph-links")
      .selectAll("line")
      .data(edges)
      .join("line")
      .attr("stroke", isDark ? "#30363d" : "#d0d7de")
      .attr("stroke-opacity", 0.6)
      .attr("stroke-width", 1);

    // Draw node groups
    const node = g
      .append("g")
      .attr("class", "graph-nodes")
      .selectAll("g")
      .data(nodes)
      .join("g")
      .attr("cursor", "pointer")
      .call(
        d3
          .drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended),
      );

    // Node circles
    node
      .append("circle")
      .attr("r", (d) => nodeRadius(d.id))
      .attr("fill", (d) => CATEGORY_COLORS[d.category]?.[colorMode] || "#999")
      .attr("stroke", isDark ? "#0d1117" : "#ffffff")
      .attr("stroke-width", 1.5);

    // Node labels
    node
      .append("text")
      .attr("class", "node-label")
      .attr("dx", (d) => nodeRadius(d.id) + 4)
      .attr("dy", "0.35em")
      .attr("font-size", "10px")
      .attr("fill", isDark ? "#e6edf3" : "#212529")
      .attr("pointer-events", "none")
      .text((d) => d.title)
      .attr("display", "none");

    // Hover interactions
    node
      .on("mouseover", function (event, d) {
        d3.select(this).select("circle").attr("stroke-width", 3);

        // Highlight connected edges
        link
          .attr("stroke-opacity", (l) =>
            l.source.id === d.id || l.target.id === d.id ? 1 : 0.1,
          )
          .attr("stroke-width", (l) =>
            l.source.id === d.id || l.target.id === d.id ? 2 : 1,
          )
          .attr("stroke", (l) =>
            l.source.id === d.id || l.target.id === d.id
              ? (CATEGORY_COLORS[d.category]?.[colorMode] || "#999")
              : isDark
                ? "#30363d"
                : "#d0d7de",
          );

        // Dim unconnected nodes
        const connectedIds = new Set();
        connectedIds.add(d.id);
        edges.forEach((l) => {
          const src = typeof l.source === "object" ? l.source.id : l.source;
          const tgt = typeof l.target === "object" ? l.target.id : l.target;
          if (src === d.id) connectedIds.add(tgt);
          if (tgt === d.id) connectedIds.add(src);
        });
        node
          .select("circle")
          .attr("opacity", (n) => (connectedIds.has(n.id) ? 1 : 0.15));
        node
          .select("text")
          .attr("opacity", (n) => (connectedIds.has(n.id) ? 1 : 0.15));

        // Tooltip
        tooltip.style.display = "block";
        tooltip.textContent = `${CATEGORY_LABELS[d.category] || d.category}: ${d.title}`;
        tooltip.style.left = event.pageX + 12 + "px";
        tooltip.style.top = event.pageY - 10 + "px";
      })
      .on("mousemove", function (event) {
        tooltip.style.left = event.pageX + 12 + "px";
        tooltip.style.top = event.pageY - 10 + "px";
      })
      .on("mouseout", function () {
        d3.select(this).select("circle").attr("stroke-width", 1.5);

        link
          .attr("stroke-opacity", 0.6)
          .attr("stroke-width", 1)
          .attr("stroke", isDark ? "#30363d" : "#d0d7de");

        node.select("circle").attr("opacity", 1);
        node.select("text").attr("opacity", 1);

        tooltip.style.display = "none";
      })
      .on("click", function (event, d) {
        event.stopPropagation();
        goto(`/${d.id}`);
      });

    // Simulation tick
    simulation.on("tick", () => {
      link
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);

      node.attr("transform", (d) => `translate(${d.x},${d.y})`);
    });

    function dragstarted(event) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }

    function dragged(event) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }

    function dragended(event) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }

    // Initial zoom to fit
    const initialScale = Math.min(width, height) / 900;
    svg.call(
      zoom.transform,
      d3.zoomIdentity
        .translate(width / 2, height / 2)
        .scale(initialScale)
        .translate(-width / 2, -height / 2),
    );

    return () => {
      simulation.stop();
    };
  });
</script>

<svelte:head>
  <title>Graph - AI Notes Explorer</title>
</svelte:head>

<div class="graph-page">
  <div class="graph-header">
    <h1>Knowledge Graph</h1>
    <p class="graph-subtitle">
      {data.nodes.length} notes, {data.edges.length} connections. Hover to highlight
      neighbors. Click a node to open it.
    </p>
  </div>

  <div class="graph-legend">
    {#each Object.entries(CATEGORY_LABELS) as [id, label]}
      <span class="legend-item">
        <span class="legend-dot" data-category={id}></span>
        {label}
      </span>
    {/each}
  </div>

  <div class="graph-container" bind:this={container}></div>
  <div class="graph-tooltip" bind:this={tooltip}></div>
</div>
