export type Feed = Omit<JsonFeedV1_1.Feed, 'version'>

export type Item = JsonFeedV1_1.Item

export type ParserKey = 'RSS_PARSER' | 'FEEDPARSER' | 'FEEDME' | 'RSS_TO_JSON' | 'JSON_FEED_V1'

export interface ParserResponse extends Feed {
  parser: ParserKey
}

export type Parser = (input: string) => Promise<ParserResponse>
