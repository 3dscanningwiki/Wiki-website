import fs from 'fs-extra';

export async function get({ params }) {
	const { slug, ext } = params;
	if (['png', 'jpg', 'jpeg', 'gif'].includes(ext.toLowerCase())) {
		const body = await fs.readFile('content/' + slug + "." + ext);
		return {
			body
		};
	} else {
		return {
			fallthrough: true
		};
	}
}
