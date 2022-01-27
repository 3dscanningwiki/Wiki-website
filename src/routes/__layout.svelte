<script>
  import "../style.css";
</script>


<nav class="header"><span class="title">3D Scanning Wiki</span></nav>
<div class="page">
	<nav class="sidebar">
		<a href="/">Home</a>
    <hr/>
    <a href="/Photogrammetry.md">Photogrammetry</a>
    <a href="/Lidar.md">Lidar / ToF</a>
    <a href="/Photometric_Stereo.md">Photometric Stereo</a>
    <a href="/Structured_Light.md">Structured Light</a>
    <hr/>
    <a href="/meta/contributing_guide.md">Contribute</a>
    <a href="https://github.com/3dscanningwiki/Wiki">GitHub</a>
	</nav>

	<div class="container">
		<slot />
	</div>
</div>

<style>
</style>
