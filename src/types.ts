export interface Feed {
  title: string | undefined
  description: string | undefined
  link: string | undefined
  feedLink: string | undefined
  entries: Item[]
  author?: string | undefined
}

export type Item = {
  title?: string
  description?: string
  categories: string[]
  pubDate?: string
  author?: string
  link?: string
  guid?: string
}
export type ParserKey = 'RSS_PARSER' | 'FEEDPARSER' | 'FEEDME' | 'RSS_TO_JSON' | 'JSON_FEED_V1'

export interface ParserResponse extends Feed {
  parser: ParserKey
}

export type Parser = (input: string) => Promise<ParserResponse>
