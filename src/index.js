const { send } = require('micro')
const { microGraphiql, microGraphql } = require('apollo-server-micro')
const { get, post, router } = require('microrouter')

const { schema } = require('./schema')
const { createErrorFormatter } = require('./errors')

const production = process.env.NODE_ENV === 'production'

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
  const graphqlHandler = microGraphql({ formatError, schema })
  const graphiqlHandler = microGraphiql({ endpointURL: '/' })

  return router(
    get('/', graphqlHandler),
    post('/', graphqlHandler),
    get('/i', graphiqlHandler),
    (req, res) => send(res, 404, 'not found')
  )
}
