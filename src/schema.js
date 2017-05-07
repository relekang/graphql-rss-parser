const { buildSchema } = require('graphql')

const parseFromUrl = require('./handler')


const Schema = buildSchema(`
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
    feed(url: String): Feed
  }
`)

const root = {
  feed: (query) => {
    return parseFromUrl(query.url)
  }
}

module.exports = { Schema, root }
