const Readable = require('stream').Readable
const FeedParser = require('feedparser')
const debug = require('debug')('graphql-rss-parser:parsers:feedparser')

const { ParserError, NotAFeedError } = require('../errors')

module.exports = function parseString(feed) {
  return new Promise((resolve, reject) => {
    try {
      debug('starting to parse')
      const feedparser = new FeedParser()
      feedparser.on('error', (error) => {
        debug('parsing failed with error', error)
        reject(new ParserError(error, 'FEEDPARSER'))
      })

      let parsedFeed
      feedparser.on('readable', function () {
        const meta = this.meta
        if (!parsedFeed) {
          parsedFeed = Object.assign({}, meta, {
            entries: [],
            parser: 'FEEDPARSER',
          })
        }

        let item
        while ((item = this.read())) {
          delete item.meta
          parsedFeed.entries.push(
            Object.assign({ categories: [] }, item, {
              pubDate: new Date(item.pubDate).toISOString(),
              author: item.author || (item['dc:creator'] || {})['#'],
            })
          )
        }
      })

      feedparser.on('end', function () {
        debug('done parsing')
        resolve(parsedFeed)
      })

      const stream = new Readable()
      stream.pipe(feedparser)
      stream.push(feed)
      stream.push(null)
    } catch (error) {
      debug('parsing failed with error', error)
      reject(new ParserError(error, 'FEEDPARSER'))
    }
  }).catch((error) => {
    debug('parsing failed with error', error)
    if (error.message === 'Not a feed' || error.cause.message === 'Not a feed') {
      throw new NotAFeedError(error)
    }
    throw error
  })
}
