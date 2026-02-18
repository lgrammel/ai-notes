<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();
  type SearchCategory = PageData["categories"][number];
  type SearchNote = SearchCategory["notes"][number];

  let query = $derived($page.url.searchParams.get("q") ?? "");
  let inputValue = $state("");

  $effect(() => {
    inputValue = query;
  });

  let results = $derived.by(() => {
    const q = query.trim().toLowerCase();
    if (!q) return null;
    return data.categories
      .map((category: SearchCategory) => ({
        ...category,
        notes: category.notes.filter((note: SearchNote) =>
          note.title.toLowerCase().includes(q),
        ),
      }))
      .filter((category: SearchCategory) => category.notes.length > 0);
  });

  let totalCount = $derived(
    results
      ? results.reduce((sum: number, cat: SearchCategory) => sum + cat.notes.length, 0)
      : 0,
  );

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
    placeholder="Search notes by title..."
    aria-label="Search notes"
  />
</form>

{#if results}
  <p class="search-summary">{totalCount} {totalCount === 1 ? "result" : "results"}</p>

  {#if results.length === 0}
    <p class="search-empty">No matching notes found.</p>
  {:else}
    {#each results as category}
      <div class="search-results-group">
        <h2>
          {category.label}
          <span class="count">{category.notes.length}</span>
        </h2>
        <ul class="note-list">
          {#each category.notes as note}
            <li>
              <a href="/{category.id}/{note.slug}">{note.title}</a>
            </li>
          {/each}
        </ul>
      </div>
    {/each}
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
