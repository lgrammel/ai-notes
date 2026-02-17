<script>
  import "../app.css";
  import { page } from "$app/stores";

  let { data, children } = $props();
  let sidebarOpen = $state(false);
  let searchQuery = $state("");
  let searchInput = $state(null);

  let searchResults = $derived.by(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return null;
    return data.categories
      .map((category) => ({
        ...category,
        notes: category.notes.filter((note) =>
          note.title.toLowerCase().includes(q),
        ),
      }))
      .filter((category) => category.notes.length > 0);
  });

  let isSearching = $derived(searchResults !== null);

  function isActive(path) {
    return $page.url.pathname === path;
  }

  function isCategoryActive(categoryId) {
    return $page.url.pathname.startsWith(`/${categoryId}`);
  }

  function clearSearch() {
    searchQuery = "";
    searchInput?.blur();
  }

  function handleSearchKeydown(event) {
    if (event.key === "Escape") {
      clearSearch();
    }
  }

  function handleGlobalKeydown(event) {
    if ((event.metaKey || event.ctrlKey) && event.key === "k") {
      event.preventDefault();
      searchInput?.focus();
    }
  }
</script>

<svelte:window onkeydown={handleGlobalKeydown} />

<div class="app">
  <button
    class="sidebar-toggle"
    onclick={() => (sidebarOpen = !sidebarOpen)}
    aria-label="Toggle navigation"
  >
    {sidebarOpen ? "\u2715" : "\u2630"}
  </button>

  <nav class="sidebar" class:open={sidebarOpen}>
    <div class="sidebar-header">
      <a href="/" onclick={() => (sidebarOpen = false)}>AI Notes</a>
    </div>

    <div class="sidebar-search">
      <div class="sidebar-search-wrapper">
        <input
          bind:this={searchInput}
          bind:value={searchQuery}
          onkeydown={handleSearchKeydown}
          type="text"
          placeholder="Search notes..."
          aria-label="Search notes"
        />
        {#if searchQuery}
          <button
            class="sidebar-search-clear"
            onclick={clearSearch}
            aria-label="Clear search"
          >
            &#x2715;
          </button>
        {/if}
      </div>
      {#if !searchQuery}
        <div class="sidebar-search-hint">
          <kbd>&#8984;K</kbd>
        </div>
      {/if}
    </div>

    <a
      href="/graph"
      class="sidebar-graph-link"
      class:active={isActive("/graph")}
      onclick={() => (sidebarOpen = false)}
    >
      Knowledge Graph
    </a>

    {#if isSearching}
      {#if searchResults.length === 0}
        <div class="search-no-results">No matching notes</div>
      {:else}
        {#each searchResults as category}
          <span class="search-category-label">
            {category.label}
            <span class="count">{category.notes.length}</span>
          </span>
          <ul>
            {#each category.notes as note}
              <li>
                <a
                  href="/{category.id}/{note.slug}"
                  class:active={isActive(`/${category.id}/${note.slug}`)}
                  onclick={() => { clearSearch(); sidebarOpen = false; }}
                >
                  {note.title}
                </a>
              </li>
            {/each}
          </ul>
        {/each}
      {/if}
    {:else}
      {#each data.categories as category}
        <details open={isCategoryActive(category.id)}>
          <summary>
            <a
              href="/{category.id}"
              class:active={isActive(`/${category.id}`)}
              onclick={() => (sidebarOpen = false)}
            >
              {category.label}
              <span class="count">{category.notes.length}</span>
            </a>
          </summary>
          <ul>
            {#each category.notes as note}
              <li>
                <a
                  href="/{category.id}/{note.slug}"
                  class:active={isActive(`/${category.id}/${note.slug}`)}
                  onclick={() => (sidebarOpen = false)}
                >
                  {note.title}
                </a>
              </li>
            {/each}
          </ul>
        </details>
      {/each}
    {/if}
  </nav>

  <main class="content">
    {@render children()}
  </main>
</div>
