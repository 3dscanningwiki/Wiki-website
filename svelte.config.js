import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({}),
		prerender: {
			crawl: true,
			enabled: true,
			entries: ['*', '/api/search_index.json', '/404'],
			onError: 'fail',
			createIndexFiles: false
		},
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',
		trailingSlash: 'never',
		browser: {
			router: false
		}
	}
};

export default config;
