import _debug from 'debug'
import { ParserKey, ParserResponse } from '../types'
const debug = _debug('graphql-rss-parser:parsers:json-parser')

export async function parse(content: any): Promise<ParserResponse> {
  debug('starting to transform')
  const output: ParserResponse = {
    parser: 'JSON_FEED_V1' as ParserKey,
    title: content.title,
    feedLink: content.feed_url,
    link: content.home_page_url,
    author: content.author.name,
    description: content.description,
    entries: content.items.map((item: any) => {
      item.guid = item.id
      item.link = item.url
      item.pubDate = item.date_published || item.date_modified
      item.categories = item.tags
      item.author = item.author.name
      return item
    }),
  }
  debug('done transform')
  return output
}
