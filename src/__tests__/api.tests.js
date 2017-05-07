const { testGraphqlApi } = require('./utils')

testGraphqlApi`
  feed(url: "https://rolflekang.com/feed.xml") {
    title
  }
`

testGraphqlApi`
  feed(url: "https://rolflekang.com/feed.xml") {
    title
    link
    entries {
      title
      link
      pubDate
    }
  }
`
