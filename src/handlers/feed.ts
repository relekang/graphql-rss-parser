import isUrl from "is-url";
import {
	BaseError,
	EmptyParserOutputError,
	InvalidUrlError,
	NotAFeedError,
	ParserError,
} from "../errors.js";
import { parserKeys, parsers } from "../parsers/index.js";
import request from "../request.js";
import transform from "../transform.js";
import type { ParserKey, ParserResponse } from "../types.js";

async function parse(parser: ParserKey, text: string) {
	const parsed = await parsers[parser](text);
	if (!parsed) throw new EmptyParserOutputError();
	return transform(parsed);
}

export async function parseFromString({
	content,
	parser,
}: {
	content: string;
	parser?: ParserKey;
}): Promise<ParserResponse> {
	if (parser) {
		return await parse(parser, content);
	}
	for (let i = 0; i < parserKeys.length; i++) {
		try {
			const parserKey: ParserKey | undefined = parserKeys[i];
			if (!parserKey) {
				continue;
			}
			return await parse(parserKey, content);
		} catch (error) {
			if (i < parserKeys.length - 1) {
				continue;
			}
			throw error;
		}
	}
	throw new BaseError("No parsers worked", "no-parser");
}

export async function parseFromQuery({
	url,
	parser,
	endTime,
	startTime,
}: {
	url: string;
	parser?: ParserKey;
	endTime?: string;
	startTime?: string;
}): Promise<ParserResponse> {
	if (!isUrl(url)) {
		throw new InvalidUrlError(url);
	}
	const response = await request(url);

	const contentType =
		(response.contentType ? response.contentType.split(";")[0] : "") || "";
	const isJsonFeed = ["application/json", "application/feed+json"].includes(
		contentType,
	);
	const isXmlFeed =
		["application/xml", "text/xml"].includes(contentType) &&
		/application\/\w+\+xml/;
	try {
		const parsed = await parseFromString({
			content: response.text,
			parser: isJsonFeed ? "JSON_FEED_V1" : parser,
		});

		parsed.items = parsed.items?.filter((item) => {
			if (item == null) {
				return false;
			}
			if (
				item.date_published &&
				endTime &&
				new Date(endTime) < new Date(item.date_published)
			) {
				return false;
			}
			if (
				item.date_published &&
				startTime &&
				new Date(startTime) > new Date(item.date_published)
			) {
				return false;
			}
			return true;
		});
		parsed.feed_url = parsed.feed_url || url;
		return parsed;
	} catch (error: any) {
		if (error instanceof ParserError && !isJsonFeed && !isXmlFeed) {
			throw new NotAFeedError(error);
		}
		throw error;
	}
}
