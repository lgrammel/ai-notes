<script lang="ts">
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();
</script>

<svelte:head>
  <title>AI Notes Explorer</title>
</svelte:head>

<h1>AI Notes Explorer</h1>
<p class="subtitle">
  A knowledge workspace about AI engineering in practice: concepts, example
  systems, ideas, and threats.
</p>

<div class="category-grid">
  {#each data.categories as category}
    <a href="/{category.id}" class="category-card">
      <h2>{category.label}</h2>
      <span class="count">{category.count} notes</span>
    </a>
  {/each}
</div>

<style>
  h1 {
    font-size: 2rem;
    font-weight: 700;
    color: var(--color-heading);
    margin-bottom: 0.5rem;
  }

  .subtitle {
    color: var(--color-text-muted);
    font-size: 1.05rem;
    max-width: 600px;
    line-height: 1.6;
  }
</style>
