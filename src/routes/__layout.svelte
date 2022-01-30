<script context="module">
	export async function load({ fetch }) {
		const content = await fetch(`/api/sidebar.json`).then((r) => r.json());
		return {
			props: { sidebar: content }
		};
	}
</script>

<script>
	import Header from '$lib/header.svelte';
	import Sidebar from '$lib/sidebar.svelte';
	import '../style.css';

	export let sidebar;
	let sidebarActive;
</script>

<Header bind:sidebarActive />
<div class="page">
	<Sidebar {sidebarActive}>
		{@html sidebar.html}
	</Sidebar>
	<div class="container">
		<slot />
	</div>
</div>

<style>
</style>
