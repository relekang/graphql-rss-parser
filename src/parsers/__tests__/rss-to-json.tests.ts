import request from "../../request.js";
/* eslint-env jest */
import { parse } from "../rss-to-json.js";

test("should parse string from rolflekang.com/feed.xml", async () => {
	const fixture = await request("https://rolflekang.com/feed.xml");

	expect(await parse(fixture.text)).toMatchSnapshot();
});
