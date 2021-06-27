import { parser } from 'rss-to-json'
import _debug from 'debug'

import { ParserError, NotAFeedError } from '../errors'
import { Item, ParserResponse } from '../types'

const debug = _debug('graphql-rss-parser:parsers:rss-to-json')

export async function parse(feed: string): Promise<ParserResponse> {
  try {
    debug('starting to parse')
    const parsed = await parser(feed)
    debug('done parsing')

    return {
      parser: 'RSS_TO_JSON',
      title: parsed.title,
      description: parsed.description,
      home_page_url: parsed.link,
      feed_url: parsed.feedLink,
      items: parsed.items.map(
        (item: any): Item => ({
          id: item.id || item.url,
          url: item.link,
          title: item.title,
          date_published: new Date(item.created).toISOString(),
          tags: typeof item.category === 'string' ? [item.category] : item.category || [],
          authors: item.author ? [{ name: item.author }] : [],
        })
      ),
    }
  } catch (error) {
    debug('parsing failed with error', error)
    if (
      error.toString().includes('There are errors in your xml') ||
      error.toString().includes("Cannot read property 'item' of undefined")
    ) {
      throw new NotAFeedError()
    }
    throw new ParserError(error, 'RSS_TO_JSON')
  }
}
