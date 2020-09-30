require('./mockAxios')
const { testGraphqlApi } = require('./utils')

const websiteUrl = 'https://rolflekang.com'
const url = 'https://rolflekang.com/feed.xml'

testGraphqlApi`
  feed(url: "${url}") { title }
`

testGraphqlApi`
  feed(url: "${url}") {
    title
    link
    entries {
      title
      link
      pubDate
    }
  }
`

testGraphqlApi`
  feed(url: "${url}", parser: FEEDPARSER) { title }
`

testGraphqlApi`
  feed(url: "${url}", parser: RSS_PARSER) { title }
`

testGraphqlApi`
  feed(url: "${url}", parser: FEEDME) { title }
`

testGraphqlApi`
  feed(url: "${url}", parser: RSS_TO_JSON) { title }
`

testGraphqlApi`
  feed(url: "${url}") { title, badField }
`

testGraphqlApi`
  feed(url: "https://rolflekang.com/testing-simple-graphql-services") { title }
`

testGraphqlApi`
  feed(url: "https://non-existing-domain.com") { title }
`

testGraphqlApi`
  findFeed(url: "${websiteUrl}") {
    link
  }
`
