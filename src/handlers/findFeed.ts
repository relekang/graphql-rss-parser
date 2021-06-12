import cheerio, { CheerioAPI, Element, Node } from 'cheerio'
import normalizeUrl from 'normalize-url'

import { parseFromQuery, parseFromString } from './feed'
import { BaseError } from '../errors'
import request from '../request'

type FindFeedResponse = {
  title: string | undefined
  link: string
}

const normalizeOptions = { removeTrailingSlash: false, stripHash: true }

export function normalizeFeedLink(baseUrl: string, link: string | undefined) {
  return normalizeUrl(
    link && /^http/.test(link)
      ? link
      : new URL(baseUrl).origin + (link && /^\//.test(link) ? link : `/${link}`),
    normalizeOptions
  )
}

function mapLinkTagToUrl(normalizedUrl: string) {
  return (linkTag: Node | Element) => {
    return normalizeFeedLink(normalizedUrl, (linkTag as Element).attribs['href'])
  }
}

async function findJsonFeedsInDom(
  dom: CheerioAPI,
  normalizedUrl: string
): Promise<FindFeedResponse[]> {
  const linkTags = dom('link[rel="alternate"][type="application/feed+json"]')

  const urls = linkTags.toArray().map(mapLinkTagToUrl(normalizedUrl))

  return (
    await Promise.all(
      urls.map(async (url) => {
        try {
          const { title } = await parseFromQuery({ url, parser: 'JSON_FEED_V1' })
          return { title, link: url }
        } catch (error) {
          if (process.env['NODE_ENV'] !== 'production' && process.env['NODE_ENV'] !== 'test') {
            console.log(error) // eslint-disable-line no-console
          }
          console.error(url, error)
          return undefined
        }
      })
    )
  ).filter((item): item is FindFeedResponse => !!item)
}

async function findRssFeedsInDom(
  dom: CheerioAPI,
  normalizedUrl: string
): Promise<FindFeedResponse[]> {
  const linkTags = dom('link[rel="alternate"][type="application/rss+xml"]').add(
    'link[rel="alternate"][type="application/atom+xml"]'
  )

  const urls = linkTags.toArray().map(mapLinkTagToUrl(normalizedUrl))

  return (
    await Promise.all(
      urls.map(async (url) => {
        try {
          const { title } = await parseFromQuery({ url })
          return { title, link: url }
        } catch (error) {
          if (process.env['NODE_ENV'] !== 'production' && process.env['NODE_ENV'] !== 'test') {
            console.log(error) // eslint-disable-line no-console
          }
          return undefined
        }
      })
    )
  ).filter((item): item is FindFeedResponse => !!item)
}

export async function findFeed({
  url,
  normalize = false,
}: {
  url: string
  normalize?: boolean
}): Promise<FindFeedResponse[]> {
  const normalizedUrl = normalize ? url : normalizeUrl(url, normalizeOptions)

  if (!normalizedUrl) {
    throw new BaseError('Empty url is not allowed', 'missing-url')
  }

  const response = await request(normalizedUrl)
  const content = response.text

  if (
    /application\/(rss|atom)/.test(response.contentType) ||
    /(application|text)\/xml/.test(response.contentType)
  ) {
    try {
      const { title } = await parseFromString({ content })
      return [{ title, link: normalizedUrl }]
    } catch (error) {
      if (process.env['NODE_ENV'] !== 'production' && process.env['NODE_ENV'] !== 'test') {
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
        parser: 'JSON_FEED_V1',
      })
      return [{ title, link: normalizedUrl }]
    } catch (error) {
      if (process.env['NODE_ENV'] !== 'production' && process.env['NODE_ENV'] !== 'test') {
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
      if (process.env['NODE_ENV'] !== 'production' && process.env['NODE_ENV'] !== 'test') {
        console.log(error) // eslint-disable-line no-console
      }
    }
  }

  const result = [
    ...(await findRssFeedsInDom(dom, normalizedUrl)),
    ...(await findJsonFeedsInDom(dom, normalizedUrl)),
  ]

  if (result.length === 0 && normalize) {
    return findFeed({ url, normalize: false })
  }

  return result
}
