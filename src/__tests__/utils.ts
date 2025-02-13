import http from "node:http";
import express from "express";

import { format } from "node:url";
import type { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import type { AxiosResponse } from "axios";
import createServer from "../";

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
		close();
		expect(response).toMatchSnapshot();
	});
}

export const listen = async (server: ApolloServer) => {
	const app: express.Express = express();
	const httpServer: http.Server = http.createServer(app);

	await server.start();

	// @ts-ignore
	app.use(express.json({ limit: "50mb" }), expressMiddleware(server));

	return await new Promise<{ url: string; close: () => void }>(
		(resolve, reject) => {
			httpServer.on("error", reject);
			httpServer.listen(() => {
				const address = httpServer.address();
				if (address && typeof address === "object") {
					const hostname =
						address.address === "" || address.address === "::"
							? "localhost"
							: address.address;
					return resolve({
						url: format({
							protocol: "http",
							hostname,
							port: address.port,
							pathname: "/",
						}),
						close: () => httpServer.close(),
					});
				}
				if (typeof address === "string") {
					return resolve({ url: address, close: () => httpServer.close() });
				}
				reject(`Unknown address type ${JSON.stringify(address)}`);
			});
		},
	);
};
