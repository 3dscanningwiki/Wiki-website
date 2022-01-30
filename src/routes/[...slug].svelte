<script context="module">
	export async function load({ params, fetch }) {
		let slug = params.slug;
		
		if (slug.endsWith("/")) {
			slug = slug.substr(0, slug.length-1);
		}

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
  import Page from "$lib/page.svelte";
  export let content;
  export let slug;
</script>

<Page slug={slug} status={content.status} html={content.html} frontmatter={content.frontmatter ?? {}} />
