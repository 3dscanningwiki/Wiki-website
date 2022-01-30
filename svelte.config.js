import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		prerender: {
			crawl: true,
			enabled: true,
			entries: ["*", "/", "/api/all_pages.json", "/api/search_index.json"],
			onError: 'fail',
			createIndexFiles: false,
		},
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',
		trailingSlash: "never",
		browser: {
			router: false,
		},
	}
};

export default config;
