import type { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { command, number, option, optional, run, string } from "cmd-ts";
import type { Options } from "./index.js";

export function cli({
	version,
	createServer,
}: {
	version: string;
	createServer: (options: Options) => Promise<ApolloServer>;
}) {
	const cmd = command({
		name: "graphql-rss-parser",
		version,
		args: {
			port: option({
				short: "p",
				long: "port",
				description: "Port to listen to",
				env: "PORT",
				type: number,
				defaultValue() {
					return 3000;
				},
			}),
			host: option({
				short: "H",
				long: "host",
				env: "HOST",
				description: "Host to listen to",
				defaultValue() {
					return "0.0.0.0";
				},
			}),
			sentryDsn: option({
				short: "D",
				long: "sentry-dsn",
				description:
					"SENTRY DSN. This is used to configure logging with sentry.io",
				env: "SENTRY_ENV",
				type: optional(string),
				defaultValue() {
					return undefined;
				},
			}),
		},
		handler: async (args) => {
			const server = await createServer({
				version,
				sentryDsn: args.sentryDsn,
			});

			console.log(`Starting graphql-rss-parser v${version}`);
			const { url } = await startStandaloneServer(server, {
				context: async ({ req }) => ({ token: req.headers.token }),
				listen: { port: 4000 },
			});
			console.log(`Running on ${url}`);
		},
	});
	return run(cmd, process.argv.slice(2));
}
