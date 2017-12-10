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
    /(application|text)\/xml/.test(response.contentType)
  ) {
    const { title } = await parseFromQuery({ url: normalizedUrl })
    return [{ title, link: normalizedUrl }]
  }

  const dom = cheerio.load(response.text)
  const $linkTags = dom('link[rel="alternate"][type="application/rss+xml"]').add(
    'link[rel="alternate"][type="application/atom+xml"]'
  )

  const urls = $linkTags
    .map((index, $linkTag) => {
      const link = $linkTag.attribs.href
      return normalizeUrl(/^\//.test(link) ? url + link : link, normalizeOptions)
    })
    .toArray()

  return (await Promise.all(
    urls.map(async url => {
      try {
        const { title } = await parseFromQuery({ url })
        return { title, link: url }
      } catch (error) {
        if (process.env.NODE_ENV !== 'production') {
          console.log(error) // eslint-disable-line no-console
        }
      }
    })
  )).filter(item => item !== undefined && item !== null)
}
