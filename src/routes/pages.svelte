<script context="module">
	export async function load({ fetch }) {
		const content = await fetch(`/api/all_pages.json`).then((r) => r.json());

		content.sort((a, b) => ((a.title ?? a.slug) > (b.title ?? b.slug) ? 1 : -1));

		return {
			props: { content }
		};
	}
</script>

<script>
	import { page } from '$app/stores';
	import A from './[...slug].svelte';

	export let content;
</script>

<main class="content">
	<h1>All Wiki Pages</h1>
	<ul>
		{#each content as page}
			<li>
				<a href={'/' + page.slug}>{page.title ?? page.slug}</a>
				{#if page.wip}
					<span class="tag">WIP</span>
				{/if}
			</li>
		{/each}
	</ul>
</main>

<style>
	.tag {
		margin: 0.5rem;
		font-size: 0.75rem;
		background-color: var(--accent-1-8);
		padding: 2px 5px;
		border-radius: 5px;
	}
</style>
