const cheerio = require('cheerio')
const normalizeUrl = require('normalize-url')

const { BaseError } = require('../errors')
const { parseFromString, parseFromQuery } = require('./feed')

const request = require('../request')

const normalizeOptions = { removeTrailingSlash: false, stripHash: true }

function normalizeFeedLink(baseUrl, link) {
  return normalizeUrl(
    /^http/.test(link) ? link : new URL(baseUrl).origin + (/^\//.test(link) ? link : `/${link}`),
    normalizeOptions
  )
}

async function findJsonFeedsInDom(dom, normalizedUrl) {
  const $linkTags = dom('link[rel="alternate"][type="application/feed+json"]')

  const urls = $linkTags
    .map((index, $linkTag) => normalizeFeedLink(normalizedUrl, $linkTag.attribs.href))
    .toArray()

  return (
    await Promise.all(
      urls.map(async (url) => {
        try {
          const { title } = await parseFromQuery({ url, parser: 'JSON_FEED_V1' })
          return { title, link: url }
        } catch (error) {
          if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test') {
            console.log(error) // eslint-disable-line no-console
          }
          console.error(url, error)
        }
      })
    )
  ).filter((item) => item !== undefined && item !== null)
}

async function findRssFeedsInDom(dom, normalizedUrl) {
  const $linkTags = dom('link[rel="alternate"][type="application/rss+xml"]').add(
    'link[rel="alternate"][type="application/atom+xml"]'
  )

  const urls = $linkTags
    .map((index, $linkTag) => normalizeFeedLink(normalizedUrl, $linkTag.attribs.href))
    .toArray()

  let items = await Promise.all(
    urls.map(async (url) => {
      try {
        const { title } = await parseFromQuery({ url })
        return { title, link: url }
      } catch (error) {
        if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test') {
          console.log(error) // eslint-disable-line no-console
        }
      }
    })
  )
  return items.filter((item) => item !== undefined && item !== null)
}

async function findFeed({ url, normalize }) {
  const normalizedUrl = normalize === false ? url : normalizeUrl(url, normalizeOptions)
  let response = null
  let content

  if (!normalizedUrl) {
    throw new BaseError('Empty url is not allowed', 'missing-url')
  }

  response = await request(normalizedUrl)
  content = response.text

  if (
    /application\/(rss|atom)/.test(response.contentType) ||
    /(application|text)\/xml/.test(response.contentType)
  ) {
    try {
      const { title } = await parseFromString({ content })
      return [{ title, link: normalizedUrl }]
    } catch (error) {
      if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test') {
        console.log(error) // eslint-disable-line no-console
      }
    }
  }
  if (
    /application\/feed\+json/.test(response.contentType) ||
    /application\/json/.test(response.contentType)
  ) {
    try {
      const { title } = await parseFromQuery({
        url,
        content,
        parser: 'JSON_FEED_V1',
      })
      return [{ title, link: normalizedUrl }]
    } catch (error) {
      if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test') {
        console.log(error) // eslint-disable-line no-console
      }
    }
  }

  const dom = cheerio.load(response.text)

  if (dom('rss')) {
    try {
      const { title } = await parseFromString({ content })
      return [{ title, link: normalizedUrl }]
    } catch (error) {
      if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test') {
        console.log(error) // eslint-disable-line no-console
      }
    }
  }

  let result = []
  result = result
    .concat(await findRssFeedsInDom(dom, normalizedUrl))
    .concat(await findJsonFeedsInDom(dom, normalizedUrl))

  if (result.length === 0 && normalize) {
    return findFeed({ url, normalize: false })
  }

  return result
}

module.exports = {
  normalizeFeedLink,
  findFeed,
}
