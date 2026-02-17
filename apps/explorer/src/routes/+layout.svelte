<script>
  import "../app.css";
  import { page } from "$app/stores";

  let { data, children } = $props();
  let sidebarOpen = $state(false);

  function isActive(path) {
    return $page.url.pathname === path;
  }

  function isCategoryActive(categoryId) {
    return $page.url.pathname.startsWith(`/${categoryId}`);
  }
</script>

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
