import { parserKeys, parsers } from "../../parsers/index.js";
import request from "../../request.js";
import { findFeed } from "../findFeed.js";

jest.mock("../../request.js");

const url = "https://example.com";
const rss = `<?xml version="1.0"?><rss version="2.0"><channel>
<title>RSS test</title><link>https://example.com/</link>
<description>Test feed</description></channel></rss>`;
const atom = `<?xml version="1.0"?><feed xmlns="http://www.w3.org/2005/Atom">
<title>Atom test</title><id>https://example.com/</id>
<updated>2026-01-01T00:00:00Z</updated></feed>`;

const rdf = `<?xml version="1.0"?><rdf:RDF
xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
xmlns="http://purl.org/rss/1.0/">
<channel rdf:about="https://example.com/">
<title>RDF test</title><link>https://example.com/</link>
<description>Test feed</description>
<items><rdf:Seq><rdf:li rdf:resource="https://example.com/item"/></rdf:Seq></items>
</channel><item rdf:about="https://example.com/item">
<title>Item</title><link>https://example.com/item</link>
</item></rdf:RDF>`;

beforeEach(() => {
	jest.replaceProperty(process, "env", { ...process.env });
	delete process.env.FEED_DISCOVERY_MAX_CANDIDATES;
	jest.mocked(request).mockReset();
	for (const key of parserKeys) {
		jest.spyOn(parsers, key);
	}
});

afterEach(() => {
	jest.restoreAllMocks();
});

function respond(text: string, contentType = "text/html") {
	jest.mocked(request).mockResolvedValueOnce({ text, contentType });
}

test.each(["application/feed+json", "application/json"])(
	"direct %s discovery uses one request to the normalized URL",
	async (contentType) => {
		const content = JSON.stringify({
			version: "https://jsonfeed.org/version/1.1",
			title: "JSON test",
			items: [],
		});
		respond(content, contentType);
		const parseJson = jest.spyOn(parsers, "JSON_FEED_V1");

		await expect(findFeed({ url: `${url}//feed.json#top` })).resolves.toEqual([
			{ title: "JSON test", link: `${url}/feed.json` },
		]);

		expect(request).toHaveBeenCalledTimes(1);
		expect(request).toHaveBeenCalledWith(`${url}/feed.json`);
		expect(parseJson).toHaveBeenCalledTimes(1);
		expect(parseJson).toHaveBeenCalledWith(content);
	},
);

test("invalid JSON returns no feeds without another request", async () => {
	respond("{invalid JSON", "application/feed+json");

	await expect(findFeed({ url })).resolves.toEqual([]);

	expect(request).toHaveBeenCalledTimes(1);
});

test("failed JSON parsing still discovers alternate links", async () => {
	respond(
		'<html><head><link rel="alternate" type="application/rss+xml" href="/feed.xml"></head></html>',
		"application/json",
	);
	respond(rss, "application/rss+xml");

	await expect(findFeed({ url })).resolves.toEqual([
		{ title: "RSS test", link: `${url}/feed.xml` },
	]);

	expect(request).toHaveBeenCalledTimes(2);
	expect(request).toHaveBeenNthCalledWith(1, url);
	expect(request).toHaveBeenNthCalledWith(2, `${url}/feed.xml`);
});

test("alternate links are deduplicated without merging parser modes or queries", async () => {
	respond(`<html><head>
		<link rel="alternate" type="application/rss+xml" href="/feed?a=1">
		<link rel="alternate" type="application/atom+xml" href="/feed?a=1">
		<link rel="alternate" type="application/rss+xml" href="/feed?a=2">
		<link rel="alternate" type="application/feed+json" href="/feed?a=1">
	</head></html>`);
	jest.mocked(request).mockResolvedValue({
		text: JSON.stringify({ title: "Feed", items: [] }),
		contentType: "application/json",
	});

	const feeds = await findFeed({ url });

	expect(feeds.map((feed) => feed.link)).toEqual([
		`${url}/feed?a=1`,
		`${url}/feed?a=2`,
		`${url}/feed?a=1`,
	]);
	expect(request).toHaveBeenCalledTimes(4);
});

test("root guesses request each normalized URL once", async () => {
	jest
		.mocked(request)
		.mockResolvedValue({ text: "<html></html>", contentType: "text/html" });

	await expect(findFeed({ url, withGuessFallback: true })).resolves.toEqual([]);

	expect(jest.mocked(request).mock.calls.map(([url]) => url)).toEqual([
		url,
		`${url}/feed.xml`,
		`${url}/atom.xml`,
		`${url}/rss.xml`,
		`${url}/feed.json`,
	]);
});

test.each([
	["2", 2],
	["40", 40],
	[undefined, 32],
	["", 32],
	["invalid", 32],
	["0", 32],
	["-1", 32],
	["1.5", 32],
	["Infinity", 32],
	["9007199254740992", 32],
] as const)(
	"candidate limit %s checks %i candidates",
	async (configuredLimit, expected) => {
		if (configuredLimit !== undefined) {
			process.env.FEED_DISCOVERY_MAX_CANDIDATES = configuredLimit;
		}
		respond(
			`<html><head>${Array.from(
				{ length: 40 },
				(_, index) =>
					`<link rel="alternate" type="application/feed+json" href="/feed-${index}">`,
			).join("")}</head></html>`,
		);
		jest.mocked(request).mockResolvedValue({
			text: JSON.stringify({ title: "Feed", items: [] }),
			contentType: "application/json",
		});

		const feeds = await findFeed({ url });

		expect(feeds).toHaveLength(expected);
		expect(request).toHaveBeenCalledTimes(expected + 1);
	},
);

test("candidate batches keep order and bound active work and candidate count", async () => {
	respond(
		`<html><head>${Array.from(
			{ length: 40 },
			(_, index) =>
				`<link rel="alternate" type="application/feed+json" href="/feed-${index}">`,
		).join("")}</head></html>`,
	);
	let active = 0;
	let maximum = 0;
	jest.mocked(request).mockImplementation(async (url) => {
		active++;
		maximum = Math.max(maximum, active);
		await new Promise((resolve) =>
			setTimeout(resolve, url.endsWith("-0") ? 20 : 1),
		);
		active--;
		if (url.endsWith("-1")) throw new Error("Failed candidate");
		return {
			text: JSON.stringify({ title: url, items: [] }),
			contentType: "application/json",
		};
	});

	const feeds = await findFeed({ url });

	expect(maximum).toBe(4);
	expect(request).toHaveBeenCalledTimes(33);
	expect(feeds.map((feed) => feed.link)).toEqual(
		Array.from({ length: 32 }, (_, index) => `${url}/feed-${index}`).filter(
			(link) => !link.endsWith("-1"),
		),
	);
});

test("ordinary HTML does not call feed parsers", async () => {
	respond(
		"<html><head><title>Not a feed</title></head><body>Hello</body></html>",
	);

	await expect(findFeed({ url })).resolves.toEqual([]);

	for (const key of parserKeys) {
		expect(parsers[key]).not.toHaveBeenCalled();
	}
});

test("HTML alternate links parse only the linked feed", async () => {
	respond(
		'<html><head><link rel="alternate" type="application/rss+xml" href="/feed.xml"></head></html>',
	);
	respond(rss, "application/rss+xml");

	await expect(findFeed({ url })).resolves.toEqual([
		{ title: "RSS test", link: "https://example.com/feed.xml" },
	]);

	expect(parsers.FEEDPARSER).toHaveBeenCalledTimes(1);
	expect(parsers.FEEDPARSER).toHaveBeenCalledWith(rss);
	for (const key of parserKeys) {
		expect(jest.mocked(parsers[key]).mock.calls.length).toBeLessThanOrEqual(1);
		for (const [content] of jest.mocked(parsers[key]).mock.calls) {
			expect(content).toBe(rss);
		}
	}
});

test.each([
	["RSS", rss, "RSS test"],
	["Atom", atom, "Atom test"],
])(
	"discovers %s with an HTML content type",
	async (_format, content, title) => {
		respond(content);

		await expect(findFeed({ url })).resolves.toEqual([{ title, link: url }]);

		expect(parsers.FEEDPARSER).toHaveBeenCalledTimes(1);
		expect(parsers.FEEDPARSER).toHaveBeenCalledWith(content);
	},
);

test.each(["application/rdf+xml", "text/html", "text/plain"])(
	"discovers RSS 1.0 with content type %s",
	async (contentType) => {
		respond(rdf, contentType);

		await expect(findFeed({ url })).resolves.toEqual([
			{ title: "RDF test", link: url },
		]);
		expect(parsers.FEEDPARSER).toHaveBeenCalledTimes(1);
		expect(parsers.FEEDPARSER).toHaveBeenCalledWith(rdf);
	},
);

test.each([
	"application/rdf+xml",
	"application/rss+xml",
	"application/atom+xml",
	"application/xml",
	"text/xml",
])(
	"failed %s parsing does not repeat the parser chain",
	async (contentType) => {
		const content = "<rss><channel>Invalid feed</channel></rss>";
		respond(content, contentType);
		for (const key of parserKeys) {
			jest.mocked(parsers[key]).mockRejectedValue(new Error("Invalid feed"));
		}

		await expect(findFeed({ url })).resolves.toEqual([]);

		for (const key of parserKeys) {
			expect(parsers[key]).toHaveBeenCalledTimes(1);
			expect(parsers[key]).toHaveBeenCalledWith(content);
		}
	},
);
