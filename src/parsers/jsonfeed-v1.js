const debug = require('debug')('graphql-rss-parser:parsers:json-parser')

module.exports = function parse(content) {
  debug('starting to transform')
  content.parser = 'JSON_FEED_V1'
  content.feedLink = content.feed_url
  content.link = content.home_page_url
  content.author = content.author.name
  content.entries = content.items.map((item) => {
    item.guid = item.id
    item.link = item.url
    item.pubDate = item.date_published || item.date_modified
    item.categories = item.tags
    item.author = item.author.name
    return item
  })
  debug('done transform')
  return content
}
