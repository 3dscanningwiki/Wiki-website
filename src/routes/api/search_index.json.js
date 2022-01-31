import { processAll } from '$lib/markdown';
import { options } from '$lib/searchOptions';
import Fuse from 'fuse.js';

export async function get() {
	const files = await processAll();

	const index = Fuse.createIndex(options.keys, files);

	return {
		body: JSON.stringify(index.toJSON(), null, 2)
	};
}
