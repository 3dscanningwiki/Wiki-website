<script>
	export let status;
	export let html;
	export let frontmatter;
  export let slug;
</script>

<svelte:head>
  <title>3D Scanning Wiki - {frontmatter?.title ?? ""}</title>
</svelte:head>


<main class="content">
	{#if status === 404}
    <h1>404 - This page does not exist!</h1>
    <p>You can create this page <a target="_blank" href="https://github.com/3dscanningwiki/3dscanningwiki.github.io/new/main">here</a></p>
  {:else}
		{@html html}
    <em><a href={`https://github.com/3dscanningwiki/3dscanningwiki.github.io/blob/main/${slug}.md`} target="_blank">Edit this page</a></em>
	{/if}
</main>