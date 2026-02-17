<script>
  let { data } = $props();
</script>

<svelte:head>
  <title>{data.category.label} - AI Notes</title>
</svelte:head>

<nav class="breadcrumb">
  <a href="/">Home</a>
  <span class="separator">/</span>
  <span>{data.category.label}</span>
</nav>

<h1>{data.category.label}</h1>
<p class="subtitle">{data.notes.length} notes</p>

<ul class="note-list">
  {#each data.notes as note}
    <li>
      <a href="/{data.category.id}/{note.slug}">{note.title}</a>
    </li>
  {/each}
</ul>

<style>
  h1 {
    font-size: 1.75rem;
    font-weight: 700;
    color: var(--color-heading);
    margin-bottom: 0.25rem;
  }

  .subtitle {
    color: var(--color-text-muted);
    margin-bottom: 1.25rem;
  }
</style>
