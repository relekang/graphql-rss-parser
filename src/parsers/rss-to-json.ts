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
      link: parsed.link,
      feedLink: parsed.feedLink,
      entries: parsed.items.map((item: any): Item => {
        return Object.assign({}, item, {
          pubDate: new Date(item.created).toISOString(),
          categories: typeof item.category === 'string' ? [item.category] : item.category || [],
          guid: item.id,
        })
      }),
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
