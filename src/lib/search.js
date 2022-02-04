import { Document } from 'flexsearch';

export const options = {
	preset: 'match',
	tokenize: 'forward',
	language: 'en',
	charset: 'latin:advanced',
	document: {
		id: 'id',
		index: ['title', 'description', 'tags', 'text']
	}
};

export async function makeIndex(entries) {
 
	const document = new Document(options);

	entries.forEach((f) => document.add(f));

	const index = [];

	//FIXME: hack because of weird async stuff, replace with simple await in the future
	await new Promise((resolve) => {
		document.export((key, value) => {
			index.push({ key, value });
			if (key === 'store') {
				resolve();
			}
		});
	});

	return index;

}


let document, pages;
export async function search(query) {
	if (query && !document) {
		document = new Document(options);
		const { index, idMap } = await fetch('/api/search_index.json').then((r) => r.json());
		pages = idMap;

		index.forEach(({ key, value }) => document.import(key, value));
	} else if (!query) {
		return [];
	}
	const result = document.search(query, 10);

	const allResults = [...new Set(result.flatMap((r) => r.result))].map((r) => pages[r]);

	return allResults;
}
