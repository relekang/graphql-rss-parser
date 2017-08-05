const cheerio = require('cheerio')
const normalizeUrl = require('normalize-url')

const request = require('../request')

module.exports = async function findFeed ({ url }) {
  let response = null

  try {
    response = await request(url)
  } catch (error) {
    console.log(error)
    return []
  }

  const dom = cheerio.load(response)
  const $linkTags = dom('link[rel="alternate"][type="application/rss+xml"]')
    .add('link[rel="alternate"][type="application/atom+xml"]')

  return $linkTags.map((index, $linkTag) => {
    const link = normalizeUrl($linkTag.attribs.href)
    return {
      link: /^\//.test(link) ? url + link : link,
    }
  }).toArray()
}
