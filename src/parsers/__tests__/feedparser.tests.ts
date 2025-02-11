import request from "../../request";
/* eslint-env jest */
import { parse } from "../feedparser";

test("should parse string from rolflekang.com/feed.xml", async () => {
	const { text } = await request("https://rolflekang.com/feed.xml");

	expect(await parse(text)).toMatchSnapshot();
});

test("should parse string from google.blogspot.com/feeds/posts/default", async () => {
	const { text } = await request(
		"http://google.blogspot.com/feeds/posts/default",
	);

	expect(await parse(text)).toMatchSnapshot();
});
