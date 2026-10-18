import type { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import type { AxiosResponse } from "axios";
import createServer from "../index.js";

export function testGraphqlApi(
	strings: TemplateStringsArray,
	...args: unknown[]
) {
	const query = String.raw(strings, ...args);
	test(query, async () => {
		const server = await createServer({
			version: "test",
		});

		const { url, close } = await listen(server);
		let response: AxiosResponse;
		try {
			response = (
				await jest.requireActual("axios")({
					url,
					method: "post",
					headers: {
						"User-Agent": "graphql-test",
						"Content-Type": "application/json",
					},
					data: JSON.stringify({ query: `query TestQuery { ${query} }` }),
				})
			).data;
		} catch (error: any) {
			if (!error.response) {
				throw error;
			}

			response = error.response.data;
		}
		await close();
		expect(response).toMatchSnapshot();
	});
}

export const listen = async (server: ApolloServer) => {
	const { url } = await startStandaloneServer(server, {
		listen: { port: 0 },
	});
	return { url, close: () => server.stop() };
};
