const release = require('./package.json').version

if (process.env.RAVEN_DSN) {
  var Raven = require('raven')
  Raven.config(process.env.RAVEN_DSN, {release}).install()
}

const url = require('url')
const { send } = require('micro')

const { parse } = require('./parser')
const { InvalidInputError } = require('./errors')

const exampleLink = (host) => `http://${host}/?feed=https://rolflekang.com/feed.xml`

function handleError (res, error, extra) {
  if (process.env.RAVEN_DSN) {
    Raven.captureException(error, {
      extra
    })
  }
  send(res, error.statusCode || 500, { error: error.constructor.name })
  console.error(error)
}

module.exports = async (req, res) => {
  const { query } = url.parse(req.url, true)
  console.log({query})
  try {
    if (!query.feed) {
      return { usage: exampleLink(req.headers.host) }
    }

    if (typeof query.feed !== 'string') {
      throw new InvalidInputError()
    }

    return await parse(query.feed)
  } catch (error) {
    handleError(res, error, {query, url: req.url})
  }
}
