const parser = require('rss-parser')

function transform(parsed, options) {
  if (!parsed) return null
  const entries = parsed.feed.entries.map(entry =>
    Object.assign({}, entry, {
      pubDate: new Date(entry.pubDate).toISOString()
    })
  )
  return Object.assign({}, parsed.feed, { entries })
}

module.exports = function parseString(document, options) {
  return new Promise((resolve, reject) => {
    parser.parseString(document, function(error, parsed) {
      if (error) return reject(error)

      resolve(transform(parsed, options))
    })
  })
}
