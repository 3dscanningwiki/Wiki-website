<script>
	export let html;
	export let frontmatter;
	export let slug;

	let editLink;
	$: editLink = `https://github.com/3dscanningwiki/3dscanningwiki.github.io/blob/main/${slug}.md`;
</script>

<svelte:head>
	<title>3D Scanning Wiki - {frontmatter?.title ?? ''}</title>
</svelte:head>

<main class="content">
	{#if frontmatter?.wip}
		<div class="note">
			This page is still a work in progress, please help <a href={editLink}>expand it</a>.
		</div>
	{/if}
	{@html html}
	<hr />
	<a class="edit-link" href={editLink} target="_blank">Edit this page</a>
</main>
