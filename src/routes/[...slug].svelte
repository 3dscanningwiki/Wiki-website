<script context="module">
	export async function load({ params, fetch }) {
		const slug = params.slug;
		try {
			const res = await fetch(`/${slug}.json`);
			const content = await res.json().catch(err => console.log(err));
			return {
				props: { content }
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

  $: notFound = content.status === 404;
</script>


{#if notFound}
  <h1>404 - Not Found!</h1>
{/if}
<Page html={content.html} frontmatter={content.frontmatter} />
