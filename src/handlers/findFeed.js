const cheerio = require('cheerio')
const normalizeUrl = require('normalize-url')

const parseFromQuery = require('./feed')

const request = require('../request')

const normalizeOptions = { removeTrailingSlash: false }

module.exports = async function findFeed({ url }) {
  const normalizedUrl = normalizeUrl(url, normalizeOptions)
  let response = null

  try {
    response = await request(normalizedUrl)
  } catch (error) {
    return []
  }

  if (
    /application\/(rss|atom)/.test(response.contentType) ||
    /text\/xml/.test(response.contentType)
  ) {
    return [{ link: normalizedUrl }]
  }

  const dom = cheerio.load(response.text)
  const $linkTags = dom(
    'link[rel="alternate"][type="application/rss+xml"]'
  ).add('link[rel="alternate"][type="application/atom+xml"]')

  const urls = $linkTags
    .map((index, $linkTag) => {
      const link = normalizeUrl($linkTag.attribs.href, normalizeOptions)
      return /^\//.test(link) ? url + link : link
    })
    .toArray()

  return Promise.all(
    urls.map(async url => {
      const { title } = await parseFromQuery({ url })
      return { title, link: url }
    })
  )
}
