<script lang="ts">
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();
</script>

<svelte:head>
  <title>{data.title} - AI Notes</title>
</svelte:head>

<nav class="breadcrumb">
  <a href="/">Home</a>
  <span class="separator">/</span>
  <a href="/{data.category.id}">{data.category.label}</a>
  <span class="separator">/</span>
  <span>{data.title}</span>
</nav>

<article class="prose">
  {@html data.html}
</article>
