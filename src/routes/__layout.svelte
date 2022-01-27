<script>
	import Header from '$lib/header.svelte';
	import Sidebar from '$lib/sidebar.svelte';
	import '../style.css';

	let sidebarActive;
</script>

<Header bind:sidebarActive={sidebarActive} />
<div class="page">
	<Sidebar {sidebarActive} />
	<div class="container">
		<slot />
	</div>
</div>

<style>
</style>
