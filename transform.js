const map = require('lodash-fp').map
const isUrl = require('is-url')

function transformEntry(entry) {
  console.log(!entry.link, isUrl(entry.title))
  return Object.assign({}, entry, {
    link: !entry.link && isUrl(entry.title) ? entry.title : entry.link
  })
}

const transformEntries = map(transformEntry)

module.exports = function transform(feed) {
  console.log(feed)
  return Object.assign({}, feed, {
    entries: transformEntries(feed.entries)
  })
}
