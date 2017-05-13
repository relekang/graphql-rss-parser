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
      .option(['R', 'raven-dsn'], 'Raven DSN. This is used to configure logging with sentry.io', process.env.RAVEN_DSN)
      .parse(process.argv, { name: 'micro-rss-parser' })

options.version = pkg.version

const server = micro(createHandler(options))

server.listen(options.port)
