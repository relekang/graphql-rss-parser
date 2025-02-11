import _debug from "debug";
import type { ParserKey, ParserResponse } from "../types";
const debug = _debug("graphql-rss-parser:parsers:json-parser");

export async function parse(input: string): Promise<ParserResponse> {
	const content: JsonFeed.Feed = JSON.parse(input);
	debug("starting to transform");

	let authors;
	if (content.version === "https://jsonfeed.org/version/1") {
		authors = content.author ? [content.author] : [];
	} else {
		authors = content.authors;
	}

	const output: ParserResponse = {
		parser: "JSON_FEED_V1" as ParserKey,
		title: content.title,
		feed_url: content.feed_url,
		home_page_url: content.home_page_url,
		authors,
		description: content.description,
		items:
			content.items?.map((item) => {
				if (content.version === "https://jsonfeed.org/version/1") {
					const author = (item as JsonFeedV1.Item).author;
					delete (item as JsonFeedV1.Item).author;
					return { ...item, authors: author ? [author] : [] };
				} else {
					return item;
				}
			}) || [],
	};
	debug("done transform");
	return output;
}
