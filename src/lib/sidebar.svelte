<script>
  export let sidebarActive;
</script>


<nav class="sidebar" class:active={sidebarActive}>
	<slot />
</nav>
