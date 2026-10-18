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
