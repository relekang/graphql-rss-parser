const request = require('superagent')
const cheerio = require('cheerio')
const normalizeUrl = require('normalize-url')

module.exports = async function findFeed ({ url }) {
  let response = null

  try {
    response = await request.get(url)
  } catch (e) {
    return []
  }

  const dom = cheerio.load(response.text)
  const $linkTags = dom('link[rel="alternate"][type="application/rss+xml"]')
    .add('link[rel="alternate"][type="application/atom+xml"]')

  return $linkTags.map((index, $linkTag) => {
    return {
      link: normalizeUrl($linkTag.attribs.href)
    }
  }).toArray()
}
