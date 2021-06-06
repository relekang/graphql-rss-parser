import _debug from 'debug'
import { Readable } from 'stream'
import FeedMe from 'feedme'
import { FeedObject } from 'feedme/dist/parser'

import { EmptyParserOutputError, ParserError } from '../errors'
import { Item, ParserResponse } from '../types'

const debug = _debug('graphql-rss-parser:parsers:feedme')

const findHtmlLink = (array: FeedObject[]): string | undefined => {
  const link = array.find(
    (item) =>
      typeof item === 'object' && item['rel'] === 'alternate' && item['type'] === 'text/html'
  )
  if (typeof link === 'object' && typeof link?.['href'] === 'string') {
    return link?.['href'] || undefined
  }
  return undefined
}

function evaluateLink(link: FeedObject | FeedObject[] | undefined): string | undefined {
  if (Array.isArray(link)) {
    return findHtmlLink(link)
  }
  if (typeof link === 'string') {
    return link
  }
  return undefined
}

function unpack(
  input: FeedObject | FeedObject[] | undefined,
  attribute: string
): string | undefined {
  if (!input) {
    return undefined
  }
  if (Array.isArray(input)) {
    return
  }
  if (typeof input === 'string') {
    return input
  }
  if (typeof input === 'object' && typeof input[attribute] === 'string') {
    return input[attribute] as string | undefined
  }
  return undefined
}

function unpackArray(input: FeedObject | FeedObject[] | undefined, attribute: string): string[] {
  if (Array.isArray(input)) {
    return input.map((item) => unpack(item, attribute)).filter((item): item is string => !!item)
  }
  if (typeof input === 'string') {
    const unpacked = unpack(input, attribute)
    return unpacked ? [unpacked] : []
  }
  return []
}

export function parse(feed: string): Promise<ParserResponse> {
  return new Promise((resolve, reject) => {
    debug('starting to parse')
    try {
      if (feed.includes('medium.com')) {
        throw new Error('Failed to parse')
      }

      const parser = new FeedMe(true)

      parser.on('end', () => {
        const parsed = parser.done()
        if (!parsed) {
          return reject(new EmptyParserOutputError())
        }
        debug('done parsing')
        try {
          resolve({
            parser: 'FEEDME',
            title: unpack(parsed['title'], 'text'),
            description: unpack(parsed['description'], 'text'),
            link: evaluateLink(parsed['link']),
            feedLink: undefined,
            entries: parsed.items.map((item): Item => {
              const pubDate = unpack(item['pubdate'], 'text')
              return {
                title: unpack(item['title'], 'text'),
                link: evaluateLink(item['link']),
                guid: unpack(item['guid'], 'text'),
                description: unpack(item['description'], 'text'),
                categories: unpackArray(item['category'], 'text'),
                pubDate: pubDate ? new Date(pubDate).toISOString() : pubDate,
                author: unpack(item['author'], 'name'),
              }
            }),
          })
        } catch (error) {
          reject(new ParserError(error, 'FEEDME'))
        }
      })

      parser.on('error', (error) => {
        debug('parsing failed with error', error)
        reject(new ParserError(error, 'FEEDME'))
      })

      const stream = new Readable()
      stream.pipe(parser)
      stream.push(feed)
      stream.push(null)
    } catch (error) {
      debug('parsing failed with error', error)
      reject(error)
    }
  })
}
