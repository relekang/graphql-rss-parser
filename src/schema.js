const { buildSchema } = require('graphql')

const feed = require('./handlers/feed')
const findFeed = require('./handlers/findFeed')

const Schema = buildSchema(`
  enum Parser {
    FEEDPARSER
    RSS_PARSER
    FEEDME
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
  }

  type Feed {
    title: String
    link: String
    feedLink: String
    parser: Parser
    author: String
    guid: String
    entries: [FeedItem]
  }

  type Query {
    findFeed(url: String!): [FindFeedResult]
    feed(url: String!, parser: Parser): Feed
  }
`)

const root = {
  feed: (query) => feed(query),
  findFeed: (query) => findFeed(query)
}

module.exports = { Schema, root }
