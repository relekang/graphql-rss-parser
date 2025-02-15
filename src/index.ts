import { ApolloServer } from "@apollo/server";

import { createErrorFormatter, sentryIgnoreErrors } from "./errors.js";
import { type LoggingOptions, createLogger } from "./logger.js";
import { schema } from "./schema.js";

export type Options = {
	version: string;
	sentryDsn?: string;
	csrfPrevention: boolean;
	loggingOptions?: LoggingOptions;
};

export default async function createServer(
	options: Options,
): Promise<ApolloServer> {
	let Sentry;

	const logger = createLogger(options.loggingOptions);

	if (options.sentryDsn) {
		Sentry = require("@sentry/node");
		Sentry.init({
			dsn: options.sentryDsn,
			release: `graphql-rss-parser@${options.version}`,
			environment: process.env.NODE_ENV,
			ignoreErrors: sentryIgnoreErrors,
			onFatalError(error: Error) {
				// @ts-ignore error does not have response
				logger.error(error, error.response);
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
		logger,
	});

	return apolloServer;
}
