<script>
  import "../style.css";
</script>


<nav class="header"><span class="title">3D Scanning Wiki</span></nav>
<div class="page">
	<nav class="sidebar">
		<a href="/">Home</a>
    <hr/>
    <a href="/Photogrammetry">Photogrammetry</a>
    <a href="/Lidar">Lidar / ToF</a>
    <a href="/Photometric_Stereo">Photometric Stereo</a>
    <a href="/Structured_Light">Structured Light</a>
    <hr/>
    <a href="/meta/contributing_guide">Contribute</a>
    <a href="https://github.com/3dscanningwiki/3dscanningwiki.github.io">GitHub</a>
	</nav>

	<div class="container">
		<slot />
	</div>
</div>

<style>
</style>
