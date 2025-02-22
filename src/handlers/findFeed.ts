import * as cheerio from "cheerio";
import type { CheerioAPI } from "cheerio";
import type { Element, Node } from "domhandler";
import normalizeUrl from "normalize-url";

import isUrl from "is-url";
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

async function findJsonFeedsInDom(
	dom: CheerioAPI,
	normalizedUrl: string,
): Promise<FindFeedResponse[]> {
	const linkTags = dom('link[rel="alternate"][type="application/feed+json"]');

	const urls = linkTags.toArray().map(mapLinkTagToUrl(normalizedUrl));

	return (
		await Promise.all(
			urls.map(async (url) => {
				try {
					const { title } = await parseFromQuery({
						url,
						parser: "JSON_FEED_V1",
					});
					return { title, link: url };
				} catch (error) {
					if (process.env.NODE_ENV !== "test") {
						logger.warn(error);
					}
					return undefined;
				}
			}),
		)
	).filter((item): item is FindFeedResponse => !!item);
}

async function findRssFeedsInDom(
	dom: CheerioAPI,
	normalizedUrl: string,
): Promise<FindFeedResponse[]> {
	const linkTags = dom('link[rel="alternate"][type="application/rss+xml"]').add(
		'link[rel="alternate"][type="application/atom+xml"]',
	);

	const urls = linkTags.toArray().map(mapLinkTagToUrl(normalizedUrl));

	return (
		await Promise.all(
			urls.map(async (url) => {
				try {
					const { title } = await parseFromQuery({ url });
					return { title, link: url };
				} catch (error) {
					if (process.env.NODE_ENV !== "test") {
						logger.warn(error);
					}
					return undefined;
				}
			}),
		)
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

	if (
		/application\/(rss|atom)/.test(response.contentType || "") ||
		/(application|text)\/xml/.test(response.contentType || "")
	) {
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
			const { title } = await parseFromQuery({
				url,
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

	if (dom("rss")) {
		try {
			const { title } = await parseFromString({ content });
			return [{ title, link: normalizedUrl }];
		} catch (error) {
			if (process.env.NODE_ENV !== "test") {
				logger.warn(error);
			}
		}
	}

	let result = [
		...(await findRssFeedsInDom(dom, normalizedUrl)),
		...(await findJsonFeedsInDom(dom, normalizedUrl)),
	];

	if (result.length === 0 && normalize) {
		return findFeed({ url, normalize: false });
	}

	if (result.length === 0 && withGuessFallback) {
		const url = new URL(normalizedUrl);
		url.pathname = "";
		const urlWithoutPath = url.toString();
		result = (
			await Promise.all([
				findFeed({ url: `${normalizedUrl}/feed.xml` }).catch(() => []),
				findFeed({ url: `${normalizedUrl}/atom.xml` }).catch(() => []),
				findFeed({ url: `${normalizedUrl}/rss.xml` }).catch(() => []),
				findFeed({ url: `${normalizedUrl}/feed.json` }).catch(() => []),
				//////////
				findFeed({ url: `${urlWithoutPath}/feed.xml` }).catch(() => []),
				findFeed({ url: `${urlWithoutPath}/atom.xml` }).catch(() => []),
				findFeed({ url: `${urlWithoutPath}/rss.xml` }).catch(() => []),
				findFeed({ url: `${urlWithoutPath}/feed.json` }).catch(() => []),
			])
		).flat();
	}

	return result;
}
