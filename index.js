const release = require('./package.json').version

if (process.env.RAVEN_DSN) {
  var Raven = require('raven')
  Raven.config(process.env.RAVEN_DSN, {release}).install()
}

const request = require('superagent')
const url = require('url')
const { send } = require('micro')

const parsers = require('./parsers')
const { EmptyHttpResponseError, EmptyParseOutputError, InvalidInputError, NotFoundError } = require('./errors')

const exampleLink = (host) => `http://${host}/?feed=https://rolflekang.com/feed.xml`

async function parse (index, text) {
  const parsed = await parsers[index](text)
  if (!parsed) throw new EmptyParseOutputError()
  return parsed
}

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

    const response = await request(query.feed).buffer()
    if (!response.text) throw new EmptyHttpResponseError()
    if (response.notFound) throw new NotFoundError(query.feed)

    let parsed
    try {
      parsed = await parse(0, response.text)
    } catch (error) {
      parsed = await parse(1, response.text)
    }

    return parsed
  } catch (error) {
    handleError(res, error, {query, url: req.url})
  }
}
