const debug = require('debug')('graphql-rss-parser:parsers')

const keys = ['FEEDPARSER', 'RSS_PARSER', 'FEEDME', 'RSS_TO_JSON']

debug('active parsers:', keys)

module.exports = {
  keys,
  RSS_PARSER: require('./rss-parser'),
  FEEDPARSER: require('./feedparser'),
  FEEDME: require('./feedme'),
  RSS_TO_JSON: require('./rss-to-json'),
}
