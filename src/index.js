const graphqlHTTP = require('express-graphql')

const { Schema, root } = require('./schema')
const { createErrorFormatter } = require('./errors')

const production = process.env.NODE_ENV === 'production'

module.exports = function createHandler(options) {
  let Raven

  if (options.ravenDsn) {
    Raven = require('raven')
    Raven.config(process.env.RAVEN_DSN, {
      release: options.version,
      environment: process.env.NODE_ENV
    }).install()
  }

  const formatError = createErrorFormatter(Raven)

  return graphqlHTTP({
    rootValue: root,
    schema: Schema,
    pretty: !production,
    graphiql: !production,
		formatError,
  })
}
