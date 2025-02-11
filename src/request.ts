import axios from "axios";
import _debug from "debug";

const debug = _debug("graphql-rss-parser:request");

import {
	ConnectionRefusedError,
	DnsLookupError,
	EmptyHttpResponseError,
	TimeoutError,
	UnknownRequestError,
	UpstreamEncryptionError,
	UpstreamHttpError,
} from "./errors";

const TIMEOUT = 30 * 1000;

export default async function request(url: string) {
	try {
		debug(`requesting ${url}`);
		const response = await axios({
			url,
			headers: {
				"User-Agent": "graphql-rss-parser",
			},
			timeout: TIMEOUT,
			responseType: "arraybuffer",
			transformResponse: undefined,
		});
		debug(`response from ${url} status-code=${response.status}`);
		if (!/2\d\d/.test(response.status.toString())) {
			throw new UpstreamHttpError("Not found", response.status);
		}
		if (!response.data) {
			throw new EmptyHttpResponseError();
		}
		return {
			text: response.data.toString(),
			status: response.status,
			contentType: response.headers["content-type"],
			headers: response.headers,
		};
	} catch (error: any) {
		debug(`request to ${url} failed with error`, error);
		if (error.response && error.response.status) {
			throw new UpstreamHttpError("Upstream HTTP error", error.response.status);
		}
		if (error.code === "ENOTFOUND" || error.code === "EAI_AGAIN") {
			throw new DnsLookupError();
		}
		if (error.code === "ECONNREFUSED" || error.code === "ECONNRESET") {
			throw new ConnectionRefusedError();
		}

		if (error.code === "ECONNABORTED" || error.code === "ETIMEDOUT") {
			throw new TimeoutError();
		}

		if (
			error.constructor === EmptyHttpResponseError ||
			error.constructor === UpstreamHttpError
		) {
			throw error;
		}

		if (/certificate|tls|ssl/.test(error.toString())) {
			throw new UpstreamEncryptionError(error);
		}

		throw new UnknownRequestError(error);
	}
}
