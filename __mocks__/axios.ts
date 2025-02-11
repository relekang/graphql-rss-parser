import { resolve } from "path";
import _axios from "axios";
/* eslint-env jest */
import * as fs from "fs-extra-promise";

export default async function axios(options: any) {
	const path = resolve(
		__dirname,
		"../__fixtures__",
		(options.url || "").replace(/https?:\/\//, "").replace(/\//g, "_") +
			".json",
	);
	let content;
	if (
		!options.url.includes("localhost:") &&
		!options.url.includes("example.com")
	) {
		try {
			content = JSON.parse((await fs.readFileAsync(path)).toString());
		} catch (error) {
			if (process.env["DEBUG_MOCKS"]) console.log(error);
		}
	}

	if (!content) {
		const response = await _axios(options);
		const contentType = response.headers["content-type"];

		content = {
			data: response.data.toString(),
			status: response.status,
			headers: response.headers || { ["content-type"]: contentType },
		};
		if (
			!options.url.includes("localhost:") &&
			!options.url.includes("example.com")
		) {
			await fs.writeFileAsync(path, JSON.stringify(content, null, 2));
		}
	}

	return content;
}
