<script context="module">
	export async function load({ params, fetch }) {
		const slug = params.slug;
		try {
			const res = await fetch(`/${slug}.md.json`);
			const content = await res.json().catch(err => console.log(err));
			return {
				props: { content, slug }
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
  import Page from "$lib/page.svelte";
  export let content;
  export let slug;
</script>

<Page slug={slug} status={content.status} html={content.html} frontmatter={content.frontmatter} />


