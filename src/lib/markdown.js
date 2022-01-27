import MarkdownIt from 'markdown-it';
import FrontMatter from 'markdown-it-front-matter';
import ReplaceLink from 'markdown-it-replace-link';
import fs from 'fs-extra';
import yaml from 'js-yaml';

const filePath = 'content/';

export async function process(fileName) {
	try {
		const str = await fs.readFile(filePath + fileName, 'utf8');

		const md = new MarkdownIt({
			replaceLink
		});
		let metadata;
		md.use(FrontMatter, (fm) => {
			metadata = yaml.load(fm);
		});
		md.use(ReplaceLink);
		const html = md.render(str);
		if (!metadata || metadata.published !== false) {
			return { html, slug: fileName.slice(0, -3), frontmatter: metadata, status: 200 };
		} 
	} catch (err) {
    console.log("404 Error loading md file", fileName);
	}
  return undefined;
}



function replaceLink(link, env) {
	if (!link.startsWith("http") && link.endsWith(".md")) {
		return link.substr(0, link.length - 3);
	}
	return link;
}