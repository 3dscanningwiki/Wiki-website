import MarkdownIt from 'markdown-it';
import FrontMatter from 'markdown-it-front-matter';
import ReplaceLink from 'markdown-it-replace-link';
import InlineComment from 'markdown-it-inline-comments';
import PlainText from 'markdown-it-plain-text';
import Footnote from 'markdown-it-footnote';
import TexMath from 'markdown-it-texmath';
import Katex from 'katex';
import fs from 'fs-extra';
import yaml from 'js-yaml';
import path from 'path';
import { dev } from '$app/env';

const filePath = 'content/';

let CACHE = null;
async function loadAll() {
	if (CACHE && !dev) {
		return CACHE;
	}

	const files = (await getFiles(filePath)).map((f) => f.substr(filePath.length));
	const data = (
		await Promise.all(
			files.map(async (f) => {
				const md = new MarkdownIt({
					replaceLink,
					breaks: false,
					linkify: true
				});

				md.use(ReplaceLink);
				md.use(PlainText);
				md.use(InlineComment);
				md.use(Footnote);
				md.use(TexMath, {
					engine: Katex,
					delimiters: 'gitlab',
				});

				let metadata;
				md.use(FrontMatter, (fm) => {
					metadata = yaml.load(fm);
				});

				const str = await fs.readFile(filePath + f, 'utf8');
				const html = md.render(str);

				if (metadata?.published === false) {
					return undefined;
				}

				return {
					metadata,
					slug: f.substring(0, f.length - 3),
					text: md.plainText,
					html
				};
			})
		)
	)
		.filter((d) => d) // remove empty
		.map((v, i) => ({ id: i, ...v })) // add id
		.reduce((p, c) => {
			// add aliases
			let aliases = [c.slug].concat(c.metadata?.alias).filter((a) => a);
			const obj = aliases.reduce((pa, ca) => ({ ...pa, [ca]: c }), {});
			return { ...p, ...obj };
		}, {});
	CACHE = data;

	return data;
}

export async function process(fileName) {
	const slug = fileName.slice(0, -3);

	return (await loadAll())[slug];
}

let processAllCache = null;
export async function processAll() {
	if (processAllCache) {
		return processAllCache;
	}

	const data = Object.values(await loadAll()).map((v) => {
		const { metadata, id, text, slug } = v;
		return { ...metadata, id, slug, text };
	});

	return data;
}

function replaceLink(link, env) {
	link = link.trim();
	if (!link.startsWith('http') && link.endsWith('.md')) {
		return link.substr(0, link.length - 3);
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
