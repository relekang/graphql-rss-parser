#!/usr/bin/env node
const updateNotifier = require('update-notifier')
const args = require('args')
const micro = require('micro')

const pkg = require('./package.json')
const createHandler = require('./src/index')

updateNotifier({ pkg }).notify()

const options = args
  .option(['p', 'port'], 'Port to listen on', process.env.PORT || 3000, Number)
  .option(['H', 'host'], 'Host to listen on', process.env.HOST || '0.0.0.0')
  .option(
    ['D', 'sentry-dsn'],
    'SENTRY DSN. This is used to configure logging with sentry.io',
    process.env.SENTRY_DSN
  )
  .parse(process.argv, { name: 'graphql-rss-parser' })

options.version = pkg.version

// eslint-disable-next-line no-console
console.log('Starting graphql-rss-parser v' + pkg.version)

const server = micro(createHandler(options))

server.listen(options.port)
