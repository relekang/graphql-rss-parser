const { makeExecutableSchema } = require('graphql-tools')

const feed = require('./handlers/feed')
const findFeed = require('./handlers/findFeed')

const typeDefs = `
  enum Parser {
    FEEDPARSER
    RSS_PARSER
    FEEDME
    RSS_TO_JSON
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
    feed(url: String!, parser: Parser): Feed
  }
`

const resolvers = {
  Query: {
    feed: (_, query) => feed.parseFromQuery(query),
    findFeed: (_, query) => findFeed(query),
  },
}

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
})

module.exports = { schema }
