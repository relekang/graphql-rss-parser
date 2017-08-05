const parser = require('rss-parser')

function transform (parsed, options) {
  if (!parsed) return null
  const entries = parsed.feed.entries.map(entry =>
    Object.assign({}, entry, {
      pubDate: entry.isoDate,
    })
  )
  return Object.assign({}, parsed.feed, { entries, parser: 'RSS_PARSER' })
}

module.exports = function parseString (document, options) {
  return new Promise((resolve, reject) => {
    parser.parseString(document, function (error, parsed) {
      if (error) return reject(error)

      resolve(transform(parsed, options))
    })
  })
}
