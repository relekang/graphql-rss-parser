import { Readable } from 'stream'
import FeedParser from 'feedparser'
import _debug from 'debug'

import { EmptyParserOutputError, NotAFeedError, ParserError } from '../errors'
import { Item, ParserResponse } from '../types'

const debug = _debug('graphql-rss-parser:parsers:feedparser')

export function parse(feed: string): Promise<ParserResponse> {
  return new Promise<ParserResponse>((resolve, reject) => {
    try {
      debug('starting to parse')
      const feedparser = new FeedParser({})
      feedparser.on('error', (error: Error) => {
        debug('parsing failed with error', error)
        reject(new ParserError(error, 'FEEDPARSER'))
      })

      let meta: FeedParser.Meta
      const items: Item[] = []
      feedparser.on('readable', function (this: FeedParser) {
        meta = meta || (this.meta as FeedParser.Meta)

        let item
        while ((item = this.read())) {
          items.push({
            title: item.title,
            content_html: item.description,
            url: item.link,
            tags: item.categories,
            date_published: item.pubdate ? new Date(item.pubdate).toISOString() : undefined,
            authors: item.author ? [{ name: item.author }] : [],
            id: item.guid,
          })
        }
      })

      feedparser.on('end', function () {
        debug('done parsing')
        if (!meta) {
          return reject(new EmptyParserOutputError())
        }
        resolve({
          parser: 'FEEDPARSER',
          title: meta.title,
          description: meta.description,
          home_page_url: meta.link,
          feed_url: undefined,
          items,
        })
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
