import createServer from "../index.js";
import { parserKeys } from "../parsers/index.js";
import type { ParserKey } from "../types.js";
import { listen } from "./utils.js";

describe("Same query should give same output for different parsers", () => {
	let response: { data: { [key in ParserKey]: unknown }; errors: any[] };
	let keys: ParserKey[] = [];
	beforeAll(async () => {
		const service = await createServer({
			version: "version",
			csrfPrevention: false,
		});

		const { url, close } = await listen(service);

		const fields =
			"title feed_url home_page_url items { id title url date_published author tags }";
		const feedUrl = "https://rolflekang.com/feed.xml";

		const query = `query TestQuery {${parserKeys
			.map(
				(key) =>
					`${key}: feed(url: "${feedUrl}", parser: ${key}) { ${fields} }`,
			)
			.join("\n")} }`;

		try {
			response = (
				await jest.requireActual("axios")({
					url,
					method: "post",
					headers: {
						"User-Agent": "graphql-test",
						"Content-Type": "application/json",
					},
					data: JSON.stringify({
						query,
					}),
				})
			).data;
		} catch (error: any) {
			if (!error.response) {
				throw error;
			}

			response = error.response.data;
		}
		close();

		expect(response.errors).toEqual(undefined);

		keys = Object.keys(response.data) as ParserKey[];
	});

	test("keys list should be correct", () => {
		expect(keys).toEqual(parserKeys);
	});

	for (let i = 0; i < parserKeys.length - 1; i++) {
		for (let j = 1; j < parserKeys.length; j++) {
			if (parserKeys[i] !== parserKeys[j]) {
				test(`${parserKeys[i]} == ${parserKeys[j]}`, () => {
					try {
						expect(response.data[parserKeys[i] as ParserKey]).toEqual(
							response.data[parserKeys[j] as ParserKey],
						);
					} catch (error) {
						console.error(parserKeys[i], parserKeys[j]);
						throw error;
					}
				});
			}
		}
	}
});
