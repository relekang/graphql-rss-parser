const { buildSchema } = require('graphql')

const handleQuery = require('./handler')


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
    feedUrl: String
    author: String
    guid: String
    entries: [FeedItem]
  }

  type Query {
    feed(url: String!, parser: Parser): Feed
  }
`)

const root = {
  feed: (query) => {
    return handleQuery(query)
  }
}

module.exports = { Schema, root }
