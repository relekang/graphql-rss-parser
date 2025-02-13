#!/usr/bin/env node

const pkg = require("./package.json");
const createServer = require("./dist").default;
console.log("", createServer);

try {
	const updateNotifier = require("update-notifier");
	updateNotifier({ pkg }).notify();
} catch {}

require("./dist/cli")
	.cli({ version: pkg.version, createServer })
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});
