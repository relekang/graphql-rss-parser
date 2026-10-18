import type { CheerioAPI } from "cheerio";
import * as cheerio from "cheerio";
import type { Element, Node } from "domhandler";
import isUrl from "is-url";
import normalizeUrl from "normalize-url";
import { InvalidUrlError } from "../errors.js";
import { logger } from "../logger.js";
import request from "../request.js";
import { parseFromQuery, parseFromString } from "./feed.js";

type FindFeedResponse = {
	title: string;
	link: string;
};

const normalizeOptions = { removeTrailingSlash: false, stripHash: true };

export function normalizeFeedLink(baseUrl: string, link: string | undefined) {
	return normalizeUrl(
		link && /^http/.test(link)
			? link
			: new URL(baseUrl).origin +
					(link && /^\//.test(link) ? link : `/${link}`),
		normalizeOptions,
	);
}

function mapLinkTagToUrl(normalizedUrl: string) {
	return (linkTag: Node | Element) => {
		return normalizeFeedLink(normalizedUrl, (linkTag as Element).attribs.href);
	};
}

async function mapCandidates<T, R>(
	candidates: T[],
	map: (candidate: T) => Promise<R>,
): Promise<R[]> {
	const results = new Array<R>(candidates.length);
	const pending = candidates.entries();
	await Promise.all(
		Array.from({ length: Math.min(4, candidates.length) }, async () => {
			for (const [index, candidate] of pending) {
				results[index] = await map(candidate);
			}
		}),
	);
	return results;
}

async function findFeedsInDom(
	dom: CheerioAPI,
	normalizedUrl: string,
): Promise<FindFeedResponse[]> {
	const rssLinks = dom('link[rel="alternate"][type="application/rss+xml"]').add(
		'link[rel="alternate"][type="application/atom+xml"]',
	);
	const jsonLinks = dom('link[rel="alternate"][type="application/feed+json"]');
	const configuredLimit = Number(process.env.FEED_DISCOVERY_MAX_CANDIDATES);
	const maxCandidates =
		Number.isSafeInteger(configuredLimit) && configuredLimit > 0
			? configuredLimit
			: 32;
	const seen = new Set<string>();
	const candidates: { url: string; parser?: "JSON_FEED_V1" }[] = [];
	for (const [links, parser] of [
		[rssLinks, undefined],
		[jsonLinks, "JSON_FEED_V1"],
	] as const) {
		for (const tag of links.toArray()) {
			const url = mapLinkTagToUrl(normalizedUrl)(tag);
			const key = `${parser || "XML"}:${url}`;
			if (seen.has(key)) continue;
			seen.add(key);
			candidates.push({ url, parser });
			if (candidates.length === maxCandidates) break;
		}
		if (candidates.length === maxCandidates) break;
	}
	return (
		await mapCandidates(candidates, async ({ url, parser }) => {
			try {
				const { title } = await parseFromQuery({ url, parser });
				return { title, link: url };
			} catch (error) {
				if (process.env.NODE_ENV !== "test") logger.warn(error);
				return undefined;
			}
		})
	).filter((item): item is FindFeedResponse => !!item);
}

export async function findFeed({
	url,
	normalize = false,
	withGuessFallback = false,
}: {
	url: string;
	normalize?: boolean;
	withGuessFallback?: boolean;
}): Promise<FindFeedResponse[]> {
	if (!/^https?/.test(url) || !isUrl(url)) {
		throw new InvalidUrlError(url);
	}

	const normalizedUrl = normalize ? url : normalizeUrl(url, normalizeOptions);

	if (!normalizedUrl) {
		throw new InvalidUrlError(url);
	}

	logger.info({ url, normalizedUrl, normalize, withGuessFallback }, "findFeed");

	const response = await request(normalizedUrl);
	const content = response.text;
	let feedParseAttempted = false;

	if (
		/application\/(rss|atom|rdf\+xml)/.test(response.contentType || "") ||
		/(application|text)\/xml/.test(response.contentType || "")
	) {
		feedParseAttempted = true;
		try {
			const { title } = await parseFromString({ content });
			return [{ title, link: normalizedUrl }];
		} catch (error) {
			if (process.env.NODE_ENV !== "test") {
				logger.warn(error);
			}
		}
	}
	if (
		/application\/feed\+json/.test(response.contentType || "") ||
		/application\/json/.test(response.contentType || "")
	) {
		try {
			const { title } = await parseFromString({
				content,
				parser: "JSON_FEED_V1",
			});
			return [{ title, link: normalizedUrl }];
		} catch (error) {
			if (process.env.NODE_ENV !== "test") {
				logger.warn(error);
			}
		}
	}
	const dom = cheerio.load(response.text);

	if (!feedParseAttempted && dom("rss, feed, rdf\\:RDF").length > 0) {
		try {
			const { title } = await parseFromString({ content });
			return [{ title, link: normalizedUrl }];
		} catch (error) {
			if (process.env.NODE_ENV !== "test") {
				logger.warn(error);
			}
		}
	}

	let result = await findFeedsInDom(dom, normalizedUrl);

	if (result.length === 0 && normalize) {
		return findFeed({ url, normalize: false });
	}

	if (result.length === 0 && withGuessFallback) {
		const url = new URL(normalizedUrl);
		url.pathname = "";
		const urlWithoutPath = url.toString();
		const guesses = new Set(
			[normalizedUrl, urlWithoutPath].flatMap((base) =>
				["feed.xml", "atom.xml", "rss.xml", "feed.json"].map((path) =>
					normalizeUrl(`${base}/${path}`, normalizeOptions),
				),
			),
		);
		result = (
			await mapCandidates([...guesses], (url) =>
				findFeed({ url }).catch(() => []),
			)
		).flat();
	}

	return result;
}
