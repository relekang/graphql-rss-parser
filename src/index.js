module.exports = function createHandler (options) {
  let Raven

  if (options.ravenDsn) {
    Raven = require('raven')
    Raven.config(process.env.RAVEN_DSN, {release: options.version}).install()
  }

  const request = require('superagent')
  const url = require('url')
  const { send } = require('micro')

  const parsers = require('./parsers')
  const transform = require('./transform')
  const { EmptyHttpResponseError, EmptyParseOutputError, InvalidInputError, NotFoundError } = require('./errors')

  const exampleLink = (host) => `http://${host}/?feed=https://rolflekang.com/feed.xml`

  async function parse (parser, text) {
    const parsed = await parsers[parser](text)
    if (!parsed) throw new EmptyParseOutputError()
    return transform(parsed)
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

  return async (req, res) => {
    const { query } = url.parse(req.url, true)
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
        parsed = await parse('rss-parser', response.text)
      } catch (error) {
        parsed = await parse('feedparser', response.text)
      }

      return parsed
    } catch (error) {
      handleError(res, error, {query, url: req.url})
    }
  }
}
