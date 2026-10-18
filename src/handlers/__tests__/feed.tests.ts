/* eslint-env jest */
import { parsers } from "../../parsers/index.js";
import type { ParserResponse } from "../../types.js";
import { parseFromQuery } from "../feed.js";

test.each([
	[
		undefined,
		undefined,
		["before", "start", "end", "after", "missing", "invalid"],
	],
	["2020-01-01", "2020-01-02", ["start", "end", "missing", "invalid"]],
	["2020-01-01", undefined, ["start", "end", "after", "missing", "invalid"]],
	[undefined, "2020-01-02", ["before", "start", "end", "missing", "invalid"]],
	["invalid", "2020-01-02", ["before", "start", "end", "missing", "invalid"]],
	["2020-01-01", "invalid", ["start", "end", "after", "missing", "invalid"]],
	["2020-01-02", "2020-01-01", ["missing", "invalid"]],
])(
	"date bounds %s to %s preserve filtering semantics",
	async (startTime, endTime, expected) => {
		const items = [
			{ id: "before", date_published: "2019-12-31T23:59:59Z" },
			{ id: "start", date_published: "2020-01-01T01:00:00+01:00" },
			{ id: "end", date_published: "2020-01-02T00:00:00Z" },
			{ id: "after", date_published: "2020-01-02T00:00:01Z" },
			{ id: "missing" },
			{ id: "invalid", date_published: "invalid" },
			null,
		];
		const parser = jest.spyOn(parsers, "RSS_PARSER").mockResolvedValue({
			parser: "RSS_PARSER",
			title: "Test feed",
			items: items as ParserResponse["items"],
		});
		try {
			const feed = await parseFromQuery({
				url: "https://rolflekang.com/feed.xml",
				parser: "RSS_PARSER",
				startTime,
				endTime,
			});
			expect(feed.items.map((item) => item.id)).toEqual(expected);
		} finally {
			parser.mockRestore();
		}
	},
);

test("feed should filter based on both startTime and endTime", async () => {
	const feeds = await parseFromQuery({
		url: "https://rolflekang.com/feed.xml",
		startTime: "2019-11-14",
		endTime: "2020-09-12",
	});

	expect(feeds.items?.map((item) => item.title)).toEqual([
		"Using Ansible handlers in loops",
		"Serving text/plain for curl with Next",
		"Wireless uplinks with Unifi",
		"Using git commits instead of git stash",
	]);
});

test("feed should filter based on startTime", async () => {
	const feeds = await parseFromQuery({
		url: "https://rolflekang.com/feed.xml",
		startTime: "2019-11-14",
	});

	expect(feeds.items?.map((item) => item.title)).toEqual([
		"Using certbot with Ansible",
		"Using Ansible handlers in loops",
		"Serving text/plain for curl with Next",
		"Wireless uplinks with Unifi",
		"Using git commits instead of git stash",
	]);
});

test("feed should filter based on both endTime", async () => {
	const feeds = await parseFromQuery({
		url: "https://rolflekang.com/feed.xml",
		endTime: "2012-11-14",
	});

	expect(feeds.items?.map((item) => item.title)).toEqual([
		"django-nopassword",
		"The Github lamp",
	]);
});
