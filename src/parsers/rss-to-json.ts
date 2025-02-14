import _debug from "debug";
import { parseFromString } from "rss-to-json";

import { NotAFeedError, ParserError } from "../errors";
import type { Item, ParserResponse } from "../types";

const debug = _debug("graphql-rss-parser:parsers:rss-to-json");

export async function parse(feed: string): Promise<ParserResponse> {
	try {
		debug("starting to parse");
		const parsed = await parseFromString(feed);
		debug("done parsing");

		return {
			parser: "RSS_TO_JSON",
			title: parsed.title,
			description: parsed.description,
			home_page_url: parsed.link,
			items: parsed.items.map(
				(item: any): Item => ({
					id: item.id || item.link,
					url: item.link,
					title: item.title,
					date_published: new Date(item.created).toISOString(),
					tags:
						typeof item.category === "string"
							? [item.category]
							: item.category || [],
					authors: item.author ? [{ name: item.author }] : [],
				}),
			),
		};
	} catch (error: any) {
		debug("parsing failed with error", error);
		if (
			error.toString().includes("There are errors in your xml") ||
			error.toString().includes("Cannot read property 'item' of undefined") ||
			error
				.toString()
				.includes("Cannot read properties of undefined (reading 'item')")
		) {
			throw new NotAFeedError();
		}
		throw new ParserError(error, "RSS_TO_JSON");
	}
}
