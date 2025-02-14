import _debug from "debug";
import type { Parser, ParserKey } from "../types.js";
import { parse as FEEDME } from "./feedme.js";
import { parse as FEEDPARSER } from "./feedparser.js";
import { parse as JSON_FEED_V1 } from "./jsonfeed-v1.js";
import { parse as RSS_PARSER } from "./rss-parser.js";
import { parse as RSS_TO_JSON } from "./rss-to-json.js";

const debug = _debug("graphql-rss-parser:parsers");

export const parserKeys: ParserKey[] = [
	"FEEDPARSER",
	"RSS_PARSER",
	"FEEDME",
	"RSS_TO_JSON",
];

debug("active parsers:", parserKeys);

export const parsers: { [key in ParserKey]: Parser } = {
	RSS_PARSER,
	FEEDPARSER,
	FEEDME,
	RSS_TO_JSON,
	JSON_FEED_V1,
};
