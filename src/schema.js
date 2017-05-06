const { buildSchema } = require('graphql')

const parseFromUrl = require('./handler')


const Schema = buildSchema(`
  type FeedItem {
    title: String
    link: String
    pubDate: String
  }

  type Feed {
    title: String
    link: String
    entries: [FeedItem]
  }

  type Query {
    feed(url: String): Feed
  }
`)

const root = {
  feed: (...args) => {
    console.log(args)
    return parseFromUrl('https://rolflekang.com/feed.xml')
  }
}

module.exports = { Schema, root }
