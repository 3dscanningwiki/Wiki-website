import fs from 'fs-extra';
import { process } from '$lib/markdown';

export async function get({ params }) {
	const { slug, ext } = params;
	if (ext.toLowerCase().endsWith('.json')) {
		const body = await process(slug + '.md');
		return {
			body
		};
	} else if (['png', 'jpg', 'jpeg', 'gif'].includes(ext.toLowerCase())) {
		const body = await fs.readFile('content/' + slug + '.' + ext);
		return {
			body
		};
	} else {
		return {
			fallthrough: true
		};
	}
}
