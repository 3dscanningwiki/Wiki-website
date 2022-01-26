import MarkdownIt from 'markdown-it';
import FrontMatter from 'markdown-it-front-matter';
import fs from 'fs-extra';
import yaml from 'js-yaml';

const filePath = 'content/';

export async function process(fileName) {
	try {
		const str = await fs.readFile(filePath + fileName, 'utf8');

		const md = new MarkdownIt();
		let metadata;
		md.use(FrontMatter, (fm) => {
			metadata = yaml.load(fm);
		});
		const html = md.render(str);
		if (!metadata || metadata.published !== false) {
			return { html, slug: fileName.slice(0, -3), frontmatter: metadata, status: 200 };
		} 
	} catch (err) {
    console.log("Error loading md file", fileName, err);
	}
  return { html: null, slug: fileName.slice(0, -3), frontmatter: null, status: 404 };
}
