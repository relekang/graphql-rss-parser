#!/usr/bin/env node

require('ts-node/register');
const updateNotifier = require('update-notifier');

const pkg = require('./package.json');
const createHandler = require('./src').default;

updateNotifier({ pkg }).notify();

require('./src/cli')
  .cli({ version: pkg.version, createHandler })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
