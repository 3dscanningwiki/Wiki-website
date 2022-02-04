<script>
import { onMount } from "svelte";


	export let html;
	export let frontmatter;
	export let slug;

	let mainElement;

	let sImage = null;

	onMount(() => {
		const imgs = mainElement.querySelectorAll("img");
		imgs.forEach(i => i.addEventListener("click", (e) => sImage = e.target))
	})

	let editLink;
	$: editLink = `https://github.dev/3dscanningwiki/3dscanningwiki.github.io/blob/main/${slug}.md`;
	$: githubLink = editLink.replace('github.dev', 'github.com');
</script>

<svelte:head>
	<title>{frontmatter?.title ?? ''} - 3D Scanning Wiki</title>
	<meta property="og:title" content={`${frontmatter?.title ?? ''} - 3D Scanning Wiki`} />
	<meta
		property="og:description"
		content={frontmatter?.description ?? frontmatter?.title ?? slug}
	/>
	<meta property="og:url" content={`https://3dscanning.wiki/${slug}`} />
</svelte:head>

<main class="content" bind:this={mainElement}>
	{#if frontmatter?.wip}
		<div class="note">
			This page is still a work in progress, please help <a href={editLink}>expand it</a>.
		</div>
	{/if}
	{@html html}
	<hr />
	<a class="edit-link" href={editLink} target="_blank">Edit this page</a>
	<a class="edit-link" href={githubLink} target="_blank">Visit this page on GitHub</a>
</main>

{#if sImage}
<div class="overlay" on:click={() => sImage = null}>
	<div class="popup">
		<img src={sImage.src} alt={sImage.alt} title={sImage.title ?? sImage.alt} />
		<p>
			{sImage.title}{sImage.alt}
		</p>
	</div>
</div>
{/if}


<style>
	.overlay {
		position: fixed; 
		display: flex;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
	  background-color: rgba(0,0,0,0.5); /* Black background with opacity */
		cursor: pointer;
		justify-content: center;
		align-items: center;
	}
	.popup {
		background-color: white;
	}
	.popup p {
		width: 100%;
		text-align: center;
	}
</style>