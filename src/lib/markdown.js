import MarkdownIt from 'markdown-it';
import FrontMatter from 'markdown-it-front-matter';
import ReplaceLink from 'markdown-it-replace-link';
import InlineComment from 'markdown-it-inline-comments';
import Footnote from 'markdown-it-footnote';
import fs from 'fs-extra';
import yaml from 'js-yaml';

const filePath = 'content/';

export async function process(fileName) {
	try {
		const str = await fs.readFile(filePath + fileName, 'utf8');

		const md = new MarkdownIt({
			replaceLink,
			breaks: false,
			linkify: true
		});

		let metadata;
		md.use(FrontMatter, (fm) => {
			metadata = yaml.load(fm);
		});

		md.use(ReplaceLink);
		md.use(InlineComment);
		md.use(Footnote);

		const html = md.render(str);
		if (!metadata || metadata.published !== false) {
			return { html, slug: fileName.slice(0, -3), frontmatter: metadata, status: 200 };
		}
	} catch (err) {
		console.log('404 Error loading md file', fileName);
	}
	return undefined;
}

function replaceLink(link, env) {
	link = link.trim()
	if (!link.startsWith('http') && link.endsWith('.md')) {
		return link.substr(0, link.length - 3);
	}
	return link;
}
