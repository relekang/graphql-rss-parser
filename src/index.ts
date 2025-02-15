import { ApolloServer } from "@apollo/server";

import { createErrorFormatter, sentryIgnoreErrors } from "./errors.js";
import { schema } from "./schema.js";

export type Options = {
	version: string;
	sentryDsn?: string;
	csrfPrevention: boolean;
};

export default async function createServer(
	options: Options,
): Promise<ApolloServer> {
	let Sentry;

	if (options.sentryDsn) {
		Sentry = require("@sentry/node");
		Sentry.init({
			dsn: options.sentryDsn,
			release: `graphql-rss-parser@${options.version}`,
			environment: process.env.NODE_ENV,
			ignoreErrors: sentryIgnoreErrors,
			onFatalError(error: Error) {
				// @ts-ignore error does not have response
				console.error(error, error.response);
			},
			debug: process.env.DEBUG_SENTRY === "true",
		});
	}

	const formatError = createErrorFormatter(Sentry);
	const apolloServer = new ApolloServer({
		schema,
		formatError,
		persistedQueries: false,
		csrfPrevention: options.csrfPrevention,
	});

	return apolloServer;
}
