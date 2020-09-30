const { parser } = require('rss-to-json')

const { ParserError, NotAFeedError } = require('../errors')

module.exports = async function parseString(feed) {
  try {
    const parsed = await parser(feed)

    return {
      parser: 'RSS_TO_JSON',
      title: parsed.title,
      link: parsed.link,
      feedLink: parsed.feedLink,
      entries: parsed.items.map((item) => {
        return Object.assign({}, item, {
          pubDate: new Date(item.created).toISOString(),
          categories: typeof item.category === 'string' ? [item.category] : item.category || [],
          guid: item.id,
        })
      }),
    }
  } catch (error) {
    if (error.toString().includes('There are errors in your xml')) {
      throw new NotAFeedError()
    }
    throw new ParserError(error, 'RSS_TO_JSON')
  }
}
