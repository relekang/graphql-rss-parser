const { ApolloServer } = require('apollo-server-micro')

const { schema } = require('./schema')
const { createErrorFormatter } = require('./errors')

module.exports = function createHandler(options) {
  let Raven

  if (options.ravenDsn) {
    Raven = require('raven')
    Raven.config(options.ravenDsn, {
      release: options.version,
      environment: process.env.NODE_ENV,
    }).install()
  }

  const formatError = createErrorFormatter(Raven)
  const apolloServer = new ApolloServer({ schema, formatError })

  return apolloServer.createHandler({ path: '/' })
}
