<script>
  export let sidebarActive = false;  

  function toggleSidebar() {
    sidebarActive = !sidebarActive;
  }
</script>


<nav class="header">
  <span class="burger" on:click={toggleSidebar}>
    <svg viewBox="0 0 100 60" width="25" height="25">
      <g style="fill:white">
        <rect width="100" height="11"></rect>
        <rect y="30" width="100" height="11"></rect>
        <rect y="60" width="100" height="11"></rect>
      </g>
    </svg>
  </span>  
  <a class="title" href="/">3D Scanning Wiki</a>
</nav>