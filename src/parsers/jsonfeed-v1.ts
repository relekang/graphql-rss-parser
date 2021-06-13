import _debug from 'debug'
import { ParserKey, ParserResponse } from '../types'
const debug = _debug('graphql-rss-parser:parsers:json-parser')

export async function parse(input: string): Promise<ParserResponse> {
  const content: JsonFeed.Feed = JSON.parse(input)
  debug('starting to transform')

  let author
  if (content.version === 'https://jsonfeed.org/version/1') {
    author = content.author?.name
  } else {
    author = content.authors?.map(({ name }) => name).find((n) => !!n)
  }

  const output: ParserResponse = {
    parser: 'JSON_FEED_V1' as ParserKey,
    title: content.title,
    feedLink: content.feed_url,
    link: content.home_page_url,
    author,
    description: content.description,
    entries:
      content.items?.map((item) => {
        let author
        if (content.version === 'https://jsonfeed.org/version/1') {
          author = (item as JsonFeedV1.Item).author?.name
        } else {
          author = (item as JsonFeedV1_1.Item).authors?.map(({ name }) => name).find((n) => !!n)
        }
        return {
          guid: item.id,
          link: item.url,
          pubDate: item.date_published || item.date_modified,
          categories: item.tags,
          author,
        }
      }) || [],
  }
  debug('done transform')
  return output
}
