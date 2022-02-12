<script>
	import { search } from './search';

	let query = '';
	let results = [];
	$: search(query).then((r) => (results = r));
</script>

<div class="search-wrap">
	<input bind:value={query} class="searchbar" type="text" placeholder="Search" />
	{#if results.length}
		<div class="results">
			<ol>
				{#each results as result}
					<li class="result">
						<a href={`/${result.slug}`}>
							<p class="res-title">{result.title ?? result.slug}</p>
							<p class="res-desc">{result.description ?? ''}</p>
						</a>
					</li>
				{/each}
			</ol>
		</div>
	{/if}
</div>

<style>
	.search-wrap {
		max-width: 75%;
		min-width: 280px;
		flex-grow: 1;
		position: relative;
		overflow: visible;
	}
	.searchbar {
		height: 2rem;
		background-color: var(--accent-2-6);
		border: 0px;
		border-radius: 0.5rem;
		width: 100%;
		display: block;
		color: var(--accent-2-text);
		padding: 0px 1rem;
	}
	.results {
		position: absolute;
		background-color: var(--accent-1-6);
		color: var(--text);
		width: 100%;
		margin: 0.5rem 0px;
		border-radius: 0.5rem;
		max-height: 500px;
		overflow-y: scroll;
	}

	.results ol {
		list-style: none;
		padding: 0.25rem;
		margin: 0.5rem;
	}

	.results li {
		background-color: white;
		margin: 0.5rem 0px;
		padding: 0.1rem 0.5rem;
		border-radius: 0.25rem;
	}

	.results li:hover {
		background-color: var(--accent-1-9);
		margin: 0.5rem 0px;
		padding: 0.1rem 0.5rem;
		border-radius: 0.25rem;
	}

	.result a {
		display: block;
		text-decoration: none;
		color: var(--text);
	}
	.result p {
		margin: 0.75rem 0rem;
	}
	.result .res-title {
		font-size: 1.2rem;
	}
	@media screen and (max-width: 800px) {
		.search-wrap {
			flex-grow: 1;
			position: relative;
			overflow: visible;
		}
	}
</style>
