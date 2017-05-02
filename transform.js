const map = require('lodash-fp').map
const isUrl = require('is-url')

const feedDefaults = {
  title: null,
  link: null,
  pubDate: null,
}

const itemDefaults = {
  title: null,
  link: null,
  pubDate: null,
}

function transformEntry(entry) {
  return Object.assign({}, feedDefaults, entry, {
    link: !entry.link && isUrl(entry.title) ? entry.title : entry.link
  })
}

const transformEntries = map(transformEntry)

module.exports = function transform(feed) {
  return Object.assign({}, itemDefaults, feed, {
    entries: transformEntries(feed.entries)
  })
}
