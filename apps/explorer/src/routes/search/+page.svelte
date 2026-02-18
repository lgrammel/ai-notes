<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import { browser } from "$app/environment";
  import { onMount } from "svelte";
  import { BM25Search, type SearchIndex } from "$lib/search";

  const CATEGORY_LABELS: Record<string, string> = {
    concepts: "Concepts",
    ideas: "Ideas",
    threats: "Threats",
    "example-systems": "Example Systems",
  };

  let query = $derived(
    browser ? ($page.url.searchParams.get("q") ?? "") : "",
  );
  let inputValue = $state("");

  let searchIndex = $state<SearchIndex | null>(null);
  let loading = $state(true);

  onMount(async () => {
    const response = await fetch("/search-index.json");
    searchIndex = await response.json();
    loading = false;
  });

  let bm25 = $derived(searchIndex ? new BM25Search(searchIndex) : null);

  $effect(() => {
    inputValue = query;
  });

  let results = $derived.by(() => {
    if (!query.trim() || !bm25) return null;
    return bm25.search(query);
  });

  function handleSubmit(event: SubmitEvent): void {
    event.preventDefault();
    const q = inputValue.trim();
    if (q) {
      goto(`/search?q=${encodeURIComponent(q)}`);
    } else {
      goto("/search");
    }
  }
</script>

<svelte:head>
  <title>{query ? `Search: ${query}` : "Search"} - AI Notes</title>
</svelte:head>

<h1>Search</h1>

<form class="search-form" onsubmit={handleSubmit}>
  <input
    class="search-input"
    type="text"
    bind:value={inputValue}
    placeholder="Search notes..."
    aria-label="Search notes"
  />
</form>

{#if query && loading}
  <p class="search-empty">Loading search index...</p>
{:else if results !== null}
  <p class="search-summary">
    {results.length}
    {results.length === 1 ? "result" : "results"}
  </p>

  {#if results.length === 0}
    <p class="search-empty">No matching notes found.</p>
  {:else}
    <ul class="search-results">
      {#each results as result}
        <li>
          <a href="/{result.category}/{result.slug}">{result.title}</a>
          <span class="category-badge">
            {CATEGORY_LABELS[result.category] ?? result.category}
          </span>
        </li>
      {/each}
    </ul>
  {/if}
{:else if !query}
  <p class="search-empty">Type a query to search across all notes.</p>
{/if}

<style>
  h1 {
    font-size: 1.75rem;
    font-weight: 700;
    color: var(--color-heading);
    margin-bottom: 1rem;
  }
</style>
