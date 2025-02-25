import type { ApolloServerOptions } from "@apollo/server";
import _debug from "debug";
import type { GraphQLFormattedError } from "graphql";
import { getReasonPhrase } from "http-status-codes";
import { logger } from "./logger.js";
import type { ParserKey } from "./types.js";

const debug = _debug("graphql-rss-parser:errors");
const development =
	!process.env.NODE_ENV ||
	process.env.NODE_ENV === "development" ||
	process.env.NODE_ENV !== "test";

export class BaseError extends Error {
	code: string;

	constructor(message: string, code: string) {
		super(message);
		this.name = this.constructor.name;
		this.code = code || "internal-server-error";
		if (typeof Error.captureStackTrace === "function") {
			Error.captureStackTrace(this, this.constructor);
		} else {
			this.stack = new Error(message).stack;
		}
	}

	toExtensions() {
		return {
			message: this.message,
			code: this.code,
		};
	}
}

export class EmptyParserOutputError extends BaseError {
	constructor() {
		super("Internal server error", "empty-parse-output");
	}
}

export class EmptyHttpResponseError extends BaseError {
	constructor() {
		super("Empty response from feed", "empty-http-response-output");
	}
}

export class InvalidInputError extends BaseError {
	constructor(message: string, code: string) {
		super(message, code || "invalid-input");
	}
}

export class UpstreamHttpError extends BaseError {
	status: number;
	statusText: string;
	constructor(message: string, status: number) {
		super(message, "upstream-http-error");
		this.status = status;
		try {
			this.statusText = getReasonPhrase(status);
		} catch (error) {
			this.statusText = `Unknown error (${status})`;
		}
	}

	override toExtensions() {
		return {
			message: this.message,
			code: this.code,
			status: this.status.toString(),
			statusText: this.statusText,
		};
	}
}
export class UpstreamEncryptionError extends BaseError {
	override cause: Error;
	constructor(error: Error) {
		super("Upstream encryption error", "upstream-encryption-error");
		this.cause = error;
	}
}

export class NotFoundError extends BaseError {
	constructor() {
		super("Could not find feed", "could-not-find-feed");
	}
}

export class DnsLookupError extends BaseError {
	constructor() {
		super("Could not find domain", "dns-lookup-error");
	}
}

export class ConnectionRefusedError extends BaseError {
	constructor() {
		super("The website refused the connection", "connection-refused");
	}
}

export class TimeoutError extends BaseError {
	constructor() {
		super("The request for the feed timed out", "timeout");
	}
}

export class UnknownRequestError extends BaseError {
	override cause: Error;
	constructor(cause: Error) {
		super("Unknown error while requesting feed", "unknown-request-error");
		this.cause = cause;
	}
}

export class ParserError extends BaseError {
	override cause: Error;
	parser: string;
	constructor(cause: Error, parser: ParserKey) {
		super(cause.message, "parser-error");
		this.cause = cause;
		this.parser = parser;
	}
}

export class NotAFeedError extends BaseError {
	override cause?: Error;
	constructor(cause?: Error) {
		super("Not a feed", "not-a-feed");
		this.cause = cause;
	}
}

export class ConnectionFailedError extends BaseError {
	url: string;
	constructor(url: string) {
		super("Could not connect", "connection-failed");
		this.url = url;
	}
}

export class InvalidUrlError extends BaseError {
	url: string;
	constructor(url: string) {
		super("Invalid url", "invalid-url");
		this.url = url;
	}
}

export class CloudflareBlockError extends BaseError {
	constructor() {
		super("Blocked by cloudflare", "cloudflare-block");
	}
}

export function createErrorFormatter(
	Sentry: any,
): ApolloServerOptions<any>["formatError"] {
	debug(
		Sentry
			? "creating error formatter with sentry"
			: "creating error formatter without sentry",
	);
	return function formatError(
		formattedError: GraphQLFormattedError,
		error: any,
	): GraphQLFormattedError {
		let extensions = formattedError.extensions;

		const originalError = error.originalError;

		if (originalError instanceof BaseError) {
			extensions = originalError.toExtensions();
		}

		if (extensions && error.stack) {
			if (development) {
				extensions.stack = error.stack.split("\n");
			}
			try {
				extensions.type = error.stack.split("\n")[0].split(":")[0];
			} catch (_error) {}
		}
		const response: GraphQLFormattedError = {
			message: formattedError.message,
			path: formattedError.path,
			locations: formattedError.locations,
			extensions,
		};

		debug.extend("formatError")("error response", response);

		if (Sentry) {
			Sentry.captureException(error, {
				extra: {
					path: formattedError.path,
					apiResponse: response,
				},
			});
		}

		logger.error(originalError ?? error);

		return response;
	};
}

export const sentryIgnoreErrors = [
	"ConnectionFailedError",
	"ConnectionRefusedError",
	"DnsLookupError",
	"EmptyHttpResponseError",
	"EmptyParseOutputError",
	"InvalidInputError",
	"NotAFeedError",
	"NotFoundError",
	"ParserError",
	"TimeoutError",
	"UpstreamHttpError",
	"UpstreamEncryptionError",
	"ValidationError",
];
