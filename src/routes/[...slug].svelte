<script context="module">
	export async function load({ params, fetch }) {
		const slug = params.slug;
		const res = await fetch(`/${slug}.json`);
		const content = await res.json().catch((err) => console.log(err));
		
		if (!content.html) {
			return {
				status: 404,
			}
		}
		
		return {
			props: { content, slug }
		};
	}
</script>

<script>
	import Page from '$lib/page.svelte';
	export let content;
	export let slug;
</script>

<Page {slug} status={content.status || 404} html={content.html} frontmatter={content.frontmatter} />
