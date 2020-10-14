const { ApolloServer } = require('apollo-server-micro')

const { schema } = require('./schema')
const { createErrorFormatter, sentryIgnoreErrors } = require('./errors')

module.exports = function createHandler(options) {
  let Sentry

  if (options.sentryDsn) {
    Sentry = require('@sentry/node')
    Sentry.init({
      dsn: options.sentryDsn,
      release: `graphql-rss-parser@${options.version}`,
      environment: process.env.NODE_ENV,
      ignoreErrors: sentryIgnoreErrors,
      onFatalError(error) {
        console.error(error, error.response)
      },
      debug: process.env.DEBUG_SENTRY == 'true',
    })
  }

  const formatError = createErrorFormatter(Sentry)
  const apolloServer = new ApolloServer({ schema, formatError })

  return apolloServer.createHandler({ path: '/' })
}
