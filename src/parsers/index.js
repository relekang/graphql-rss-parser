module.exports = {
  keys: ['FEEDPARSER', 'RSS_PARSER', 'FEEDME', 'RSS_TO_JSON'],
  RSS_PARSER: require('./rss-parser'),
  FEEDPARSER: require('./feedparser'),
  FEEDME: require('./feedme'),
  RSS_TO_JSON: require('./rss-to-json'),
}
