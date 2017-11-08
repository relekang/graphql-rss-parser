const Readable = require('stream').Readable
const FeedParser = require('feedparser')

const { ParserError, NotAFeedError } = require('../errors')

module.exports = function parseString(feed) {
  return new Promise((resolve, reject) => {
    try {
      const feedparser = new FeedParser()
      feedparser.on('error', error => {
        reject(new ParserError(error))
      })

      let parsedFeed
      feedparser.on('readable', function() {
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
            Object.assign({}, item, {
              pubDate: new Date(item.pubDate).toISOString(),
            })
          )
        }
      })

      feedparser.on('end', function() {
        resolve(parsedFeed)
      })

      const stream = new Readable()
      stream.pipe(feedparser)
      stream.push(feed)
      stream.push(null)
    } catch (error) {
      reject(error)
    }
  }).catch(error => {
    if (error.message === 'Not a feed') {
      throw new NotAFeedError(error)
    }
    throw error
  })
}
