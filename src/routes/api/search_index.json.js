// @ts-check

import { processAll } from '$lib/markdown';
import { makeIndex } from '$lib/search';

export async function get() {
	const files = await processAll();
	const index = await makeIndex(files);

	const idMap = files.reduce((p, c) => {
		const { slug, title, description } = c;
		return { ...p, [c.id]: { slug, title, description } };
	}, {});

	return {
		body: {
			index,
			idMap
		}
	};
}
