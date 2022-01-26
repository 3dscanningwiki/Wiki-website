<script>
  export let html;
  export let frontmatter;
</script>

{@html html}

<pre>

  {JSON.stringify(frontmatter)}
</pre>