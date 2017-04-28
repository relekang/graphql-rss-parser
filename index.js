const release = require('./package.json').version

if (process.env.RAVEN_DSN) {
  var Raven = require('raven')
  Raven.config(process.env.RAVEN_DSN, {release}).install()
}

const url = require('url');
const { sendError } = require('micro');
const { parse } = require('./parser');

const exampleLink = (host) => `http://${host}/?feed=https://rolflekang.com/feed.xml`

module.exports = async (req, res) => {
  const { query } = url.parse(req.url, true)
  if (!query.feed) {
    return { usage: exampleLink(req.headers.host) }
  }

  try {
    return await parse(query.feed)
  } catch (error) {
    sendError(req, res, error);
    if (process.env.RAVEN_DSN) {
      Raven.captureException(error, {
        extra: {query}
      })
    }
  }
}
