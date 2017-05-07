const map = require('lodash-fp').map
const isUrl = require('is-url')

function transformEntry (entry) {
  return Object.assign({}, entry, {
    link: !entry.link && isUrl(entry.title) ? entry.title : entry.link
  })
}

const transformEntries = map(transformEntry)

module.exports = function transform (feed) {
  return Object.assign({}, feed, {
    entries: transformEntries(feed.entries)
  })
}
