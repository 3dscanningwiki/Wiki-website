<script context="module">
	export async function load({ fetch }) {
    const content = await fetch(`/api/all_pages.json`).then((r) => r.json());
    return {
      props: { content }
    };
	}
</script>

<script>
  export let content;
</script>

<ul>
  {#each content as page}
  <li><a href={'/' +page.slug}>{page.title ?? page.slug}</a></li>
  {/each}
</ul>