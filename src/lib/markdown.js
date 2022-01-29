import MarkdownIt from 'markdown-it';
import FrontMatter from 'markdown-it-front-matter';
import ReplaceLink from 'markdown-it-replace-link';
import InlineComment from 'markdown-it-inline-comments';
import Footnote from 'markdown-it-footnote';
import fs from 'fs-extra';
import yaml from 'js-yaml';
import path from 'path';

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

export async function processAll() {
	const files = (await getFiles(filePath)).map(f => f.substr(filePath.length))

	const data = Promise.all(files.map(async f => {
		const md = MarkdownIt();
		let metadata;
		md.use(FrontMatter, (fm) => {
			metadata = yaml.load(fm);
		});
		const str = await fs.readFile(filePath + f, 'utf8');
		md.render(str);
		
		return {
			text: str,
			...metadata,
		}
	}));

	return data;
}

const protocolRegex = /^.{1,8}:\/\//

function replaceLink(link, env) {
	link = link.trim()
	if (!link.match(protocolRegex) && ! link.startsWith("/")) {	
		link = "../" + link;
	}
	if (!link.startsWith('http') && link.endsWith('.md')) {
		return link.substr(0, link.length - 3) + "/";
	}
	return link;
}

async function getFiles(dir) {
	const dirEntries = await fs.readdir(dir, { withFileTypes: true });
	const files = await Promise.all(
		dirEntries.map((dirEntry) => {
			const res = path.join(dir, dirEntry.name);
			if (dirEntry.isDirectory()) {
				return getFiles(res);
			} else if (res.endsWith('.md')) {
				return res;
			} else {
				return [];
			}
		})
	);
	return files.flat();
}