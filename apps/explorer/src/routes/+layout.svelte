<script>
  import "../app.css";
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";

  let { data, children } = $props();
  let sidebarOpen = $state(false);
  let searchInput = $state(null);

  function isActive(path) {
    return $page.url.pathname === path;
  }

  function isCategoryActive(categoryId) {
    return $page.url.pathname.startsWith(`/${categoryId}`);
  }

  function handleSearchSubmit(event) {
    event.preventDefault();
    const q = searchInput?.value?.trim();
    if (q) {
      goto(`/search?q=${encodeURIComponent(q)}`);
      searchInput.value = "";
      sidebarOpen = false;
    }
  }

  function handleSearchKeydown(event) {
    if (event.key === "Escape") {
      searchInput.value = "";
      searchInput?.blur();
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
      <a href="/" onclick={() => (sidebarOpen = false)}>AI Engineering</a>
    </div>

    <form class="sidebar-search" onsubmit={handleSearchSubmit}>
      <div class="sidebar-search-wrapper">
        <input
          bind:this={searchInput}
          onkeydown={handleSearchKeydown}
          type="text"
          name="q"
          placeholder="Search notes..."
          aria-label="Search notes"
        />
      </div>
      <div class="sidebar-search-hint">
        <kbd>&#8984;K</kbd>
      </div>
    </form>

    <a
      href="/graph"
      class="sidebar-graph-link"
      class:active={isActive("/graph")}
      onclick={() => (sidebarOpen = false)}
    >
      Knowledge Graph
    </a>

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
  </nav>

  <main class="content">
    {@render children()}
  </main>
</div>
