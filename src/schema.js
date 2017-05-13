const { buildSchema } = require('graphql')

const feed = require('./handlers/feed')
const handleFromWebsite = require('./handlers/fromWebsite');


const Schema = buildSchema(`
  enum Parser {
    FEEDPARSER
    RSS_PARSER
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
    fromWebsite(websiteUrl: String!): [Feed]
    feed(url: String!, parser: Parser): Feed
  }
`)

const root = {
  feed: (query) => handleQuery(query),
  fromWebsite: (query) => handleFromWebsite(query)
}

module.exports = { Schema, root }
