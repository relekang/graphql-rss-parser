/* eslint-env jest */
import nock from "nock";

import request from "../request.js";

describe("request", () => {
	beforeAll(() => {
		nock.cleanAll();
	});

	it("should return response for successful call", async () => {
		nock("http://example.com").get("/").reply(200, "Success");

		const response = await request("http://example.com");

		expect(response.status).toEqual(200);
		expect(response.text).toEqual("Success");
		expect(response.contentType).toBeUndefined();
	});

	it("should return the content type header", async () => {
		nock("http://example.com").get("/").reply(200, "Success", {
			"Content-Type": "application/rss+xml; charset=utf-8",
		});

		const response = await request("http://example.com");

		expect(response.contentType).toEqual("application/rss+xml; charset=utf-8");
	});

	it("should throw error for empty content", async () => {
		nock("http://example.com").get("/").reply(200);

		const promise = request("http://example.com");

		await expect(promise).rejects.toMatchObject({
			code: "empty-http-response-output",
		});
	});

	it("should throw error for not-found", async () => {
		nock("http://example.com").get("/").reply(404);

		const promise = request("http://example.com");

		await expect(promise).rejects.toMatchObject({
			code: "upstream-http-error",
			status: 404,
		});
	});

	it("should throw error for 500", async () => {
		nock("http://example.com").get("/").reply(500);

		const promise = request("http://example.com");

		await expect(promise).rejects.toMatchObject({
			code: "upstream-http-error",
			status: 500,
		});
	});

	it("should throw unknown request error", async () => {
		nock("http://example.com");

		const promise = request("http://example.com");

		await expect(promise).rejects.toMatchObject({
			code: "unknown-request-error",
		});
	});
});
