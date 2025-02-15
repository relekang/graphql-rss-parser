import type { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import {
	boolean,
	command,
	flag,
	number,
	option,
	optional,
	run,
	string,
} from "cmd-ts";
import type { Options } from "./index.js";
import { logger } from "./logger.js";

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
			csrfPrevention: flag({
				type: boolean,
				short: "C",
				long: "csrf-prevention",
				description: "Toggle for CSRF prevention",
				env: "CSRF_PREVENTION",
				defaultValue() {
					return false;
				},
			}),
			logLevel: option({
				type: optional(string),
				short: "L",
				long: "log-level",
				description: `"fatal" | "error" | "warn" | "info" | "debug" | "trace" | "silent"`,
				env: "LOG_LEVEL",
				defaultValue() {
					return "info";
				},
			}),
			prettyLog: flag({
				type: boolean,
				short: "P",
				long: "pretty-log",
				description: "Log human readable instead of JSON",
				env: "PRETTY_LOG",
				defaultValue() {
					return true;
				},
			}),
		},
		handler: async (args) => {
			const server = await createServer({
				version,
				sentryDsn: args.sentryDsn,
				csrfPrevention: args.csrfPrevention,
				loggingOptions: { level: "info", pretty: true },
			});
			logger.info(
				`Starting graphql-rss-parser v${version} with ${JSON.stringify({ ...args }, null, 2)}`,
			);
			const { url } = await startStandaloneServer(server, {
				context: async ({ req }) => ({ token: req.headers.token }),
				listen: { host: args.host, port: args.port },
			});
			server.logger.info(`Running on ${url}`);
		},
	});
	return run(cmd, process.argv.slice(2));
}
