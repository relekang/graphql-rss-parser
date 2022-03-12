#!/usr/bin/env node

const updateNotifier = require('update-notifier');

const pkg = require('./package.json');
const createHandler = require('./dist').default;

updateNotifier({ pkg }).notify();

require('./dist/cli')
  .cli({ version: pkg.version, createHandler })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
