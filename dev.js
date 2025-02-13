#!/usr/bin/env node

require("ts-node/register");

const pkg = require("./package.json");
const createServer = require("./src").default;

require("./src/cli")
	.cli({ version: pkg.version, createServer })
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});
