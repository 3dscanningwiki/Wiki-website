import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		prerender: {
			crawl: true,
			enabled: true,
			entries: ['*'],
			onError: 'fail'
		},
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',
		trailingSlash: "never",
	}
};

export default config;
