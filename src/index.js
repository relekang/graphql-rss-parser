const graphqlHTTP = require('express-graphql')

const { Schema, root } = require('./schema')

module.exports = function createHandler (options) {
  let Raven

  if (options.ravenDsn) {
    Raven = require('raven')
    Raven.config(process.env.RAVEN_DSN, {release: options.version}).install()
  }

  return graphqlHTTP({
    rootValue: root,
    schema: Schema,
    pretty: true,
    graphiql: true
  });
}
