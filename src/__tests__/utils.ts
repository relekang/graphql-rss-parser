import type { Server } from "http";
/* eslint-env jest */
import micro from "micro";

import createHandler from "../";

export const listen = (server: Server) =>
	new Promise<{ url: string; close: () => void }>((resolve, reject) => {
		server.on("error", reject);

		server.listen(() => {
			const address = server.address();
			if (typeof address === "string") {
				resolve({ url: address, close: () => server.close() });
			} else {
				resolve({
					url: `http://localhost:${address?.port}`,
					close: () => server.close(),
				});
			}
		});
	});

export function testGraphqlApi(
	strings: TemplateStringsArray,
	...args: unknown[]
) {
	const query = String.raw(strings, ...args);
	test(query, async () => {
		const service = micro(
			await createHandler({
				version: "test",
			}),
		);

		const { url, close } = await listen(service);
		let response;
		try {
			response = (
				await jest.requireActual("axios")({
					url,
					method: "post",
					headers: {
						"User-Agent": "graphql-test",
						"Content-Type": "application/json",
					},
					data: JSON.stringify({ query: "query TestQuery { " + query + " }" }),
				})
			).data;
		} catch (error: any) {
			if (!error.response) {
				throw error;
			}

			response = error.response.data;
		}
		close();
		expect(response).toMatchSnapshot();
	});
}
