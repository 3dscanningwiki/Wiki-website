import { processAll } from '$lib/markdown';

export async function get() {
	const files = await processAll();

	return {
		body: files
	};
}
