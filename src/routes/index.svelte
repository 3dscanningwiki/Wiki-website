<script context="module">
	export async function load({ fetch }) {
		try {
			const content = await fetch(`/api/home.json`).then((r) => r.json());
			return {
				props: { content, slug: 'home' }
			};
		} catch (err) {
			return {
				status: 404,
				error: err
			};
		}
	}
</script>

<script>
	import Page from '$lib/page.svelte';
	export let content;
	export let slug;
</script>

<Page {slug} html={content.html} frontmatter={content.frontmatter ?? {}} />
