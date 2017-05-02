var parser = require('rss-parser')

function transform (parsed, options) {
  const {title, link, feedUrl} = parsed.feed
  const entries = parsed.feed.entries.map(entry => ({
    title: entry.title,
    pubDate: new Date(entry.pubDate).toISOString(),
    link: entry.link
  }))
  return { title, link, feedUrl, entries }
}

module.exports = function parseString (document, options) {
  return new Promise((resolve, reject) => {
    parser.parseString(document, function (error, parsed) {
      if (error) return reject(error)

      resolve(transform(parsed, options))
    })
  })
}
