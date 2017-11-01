const cheerio = require('cheerio')
const normalizeUrl = require('normalize-url')

const request = require('../request')

const normalizeOptions = {removeTrailingSlash: false}

module.exports = async function findFeed ({ url }) {
  const normalizedUrl = normalizeUrl(url, normalizeOptions)
  let response = null

  try {
    response = await request(normalizedUrl)
  } catch (error) {
    console.log(error)
    return []
  }

  if (/application\/(rss|atom)/.test(response.contentType)) {
    return [{link: normalizedUrl}]
  }

  const dom = cheerio.load(response.text)
  const $linkTags = dom('link[rel="alternate"][type="application/rss+xml"]')
    .add('link[rel="alternate"][type="application/atom+xml"]')

  return $linkTags.map((index, $linkTag) => {
    const link = normalizeUrl($linkTag.attribs.href, normalizeOptions)
    return {
      link: /^\//.test(link) ? url + link : link
    }
  }).toArray()
}
