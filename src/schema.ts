import { makeExecutableSchema } from 'graphql-tools'
import _debug from 'debug'
import * as feed from './handlers/feed'
import { findFeed } from './handlers/findFeed'

const debug = _debug('graphql-rss-parser:schema')

const typeDefs = `
  enum Parser {
    FEEDPARSER
    RSS_PARSER
    FEEDME
    RSS_TO_JSON
    JSON_FEED_V1
  }

  type FindFeedResult {
    title: String
    link: String
  }

  type FeedItem {
    title: String
    link: String
    pubDate: String
    guid: String
    author: String
    categories: [String!]!
  }

  type Feed {
    title: String
    link: String
    feedLink: String
    parser: Parser
    author: String
    guid: String
    entries: [FeedItem!]!
  }

  type Query {
    findFeed(url: String!): [FindFeedResult]!
    feed(url: String!, parser: Parser, startTime: String, endTime: String): Feed
  }
`

const resolvers = {
  Query: {
    feed: (_: any, query: any) => {
      debug('query-resolver feed, query:', query)
      return feed.parseFromQuery(query)
    },
    findFeed: (_: any, query: any) => {
      debug('query-resolver findFeed, query:', query)
      return findFeed(query)
    },
  },
}

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
})
