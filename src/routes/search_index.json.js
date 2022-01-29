import { processAll } from '$lib/markdown';
import Fuse from 'fuse.js';

export async function get() {
	const files = await processAll();

	const options = {
		minMatchCharLength: 3,
		keys: [
			{ name: 'title', weight: 5 },
			{ name: 'keywords', weight: 3 },
			{ name: 'description', weight: 1 },
			{ name: 'text', weight: 1 }
		]
	}

	const index = Fuse.createIndex(options.keys, files);

	

	return {
		body: index
	};
}
