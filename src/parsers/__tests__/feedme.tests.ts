import request from "../../request.js";
/* eslint-env jest */
import { parse } from "../feedme.js";

test("should parse string from rolflekang.com/feed.xml", async () => {
	const fixture = await request("https://rolflekang.com/feed.xml");

	expect(await parse(fixture.text)).toMatchSnapshot();
});

test("should parse string from google.blogspot.com/feeds/posts/default", async () => {
	const fixture = await request(
		"http://google.blogspot.com/feeds/posts/default",
	);

	expect(await parse(fixture.text)).toMatchSnapshot();
});
