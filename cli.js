#!/usr/bin/env node

import updateNotifier from "update-notifier";
import { cli } from "./dist/cli.js";
import createServer from "./dist/index.js";
import pkg from "./package.json" with { type: "json" };

try {
	updateNotifier({ pkg }).notify();
} catch {}

cli({ version: pkg.version, createServer }).catch((error) => {
	console.error(error);
	process.exit(1);
});
