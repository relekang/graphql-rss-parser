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
  feed(url: "https://rolflekang.com/not-a-feed.xml") { title }
`

testGraphqlApi`
  feed(url: "https://non-existing-domain.com") { title }
`
testGraphqlApi`
  feed(url: "https://non-existing-domain.com") { title, badField }
`

testGraphqlApi`
  fromWebsite(websiteUrl: "${websiteUrl}") {
    link
  }
`
