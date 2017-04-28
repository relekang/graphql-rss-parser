const Readable = require('stream').Readable
const FeedParser = require('feedparser')
const request = require('superagent')

const { EmptyHttpResponseError, EmptyParseOutputError, ParserError, NotAFeedError } = require('./errors')

function transform (feed) {
  return Object.keys(feed).reduce(
    (lastValue, key) =>
      Object.assign(
        {},
        lastValue,
        !/rss|@|#|atom/.test(key) && { [key]: feed[key] }
      ),
    {}
  )
}

function parseString (feed) {
  return new Promise((resolve, reject) => {
    try {
      const feedparser = new FeedParser()
      feedparser.on('error', error => {
        reject(new ParserError(error))
      })

      let parsedFeed
      feedparser.on('readable', function () {
        const meta = this.meta
        if (!parsedFeed) {
          parsedFeed = Object.assign({}, meta, { items: [] })
        }

        let item
        while ((item = this.read())) {
          delete item.meta
          parsedFeed.items.push(transform(item))
        }
      })

      feedparser.on('end', function () {
        resolve(parsedFeed)
      })

      const stream = new Readable()
      stream.pipe(feedparser)
      stream.push(feed)
      stream.push(null)
    } catch (error) {
      console.log({error})
      reject(error)
    }
  })
  .catch(error => {
    if (error.message === 'Not a feed') {
      throw new NotAFeedError(error)
    }
    throw error
  })
}

async function parse (url) {
  const response = await request(url).buffer()
  if (!response.text) throw new EmptyHttpResponseError()

  const parsed = await parseString(response.text)
  if (!parsed) throw new EmptyParseOutputError()

  return transform(parsed)
}

module.exports = { parse, parseString }
