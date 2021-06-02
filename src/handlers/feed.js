const parsers = require('../parsers')
const transform = require('../transform')
const request = require('../request')
const { EmptyParseOutputError } = require('../errors')

async function parse(parser, text) {
  const parsed = await parsers[parser](text)
  if (!parsed) throw new EmptyParseOutputError()
  return transform(parsed)
}

async function parseFromString({ content, parser }) {
  if (parser) {
    return parse(parser, content)
  } else {
    for (let i = 0; i < parsers.keys.length; i++) {
      try {
        return await parse(parsers.keys[i], content)
      } catch (error) {
        if (i < parsers.keys.length - 1) {
          continue
        }
        throw error
      }
    }
  }
}

async function parseFromQuery({ url, parser, endTime, startTime }) {
  const response = await request(url)

  const isJsonFeed = ['application/json', 'application/feed+json'].includes(
    response.contentType.split(';')[0]
  )
  const parsed = await parseFromString({
    content: response.text,
    parser: isJsonFeed ? 'JSON_FEED_V1' : parser,
  })

  parsed.entries = parsed.entries.filter((item) => {
    if (item == null) {
      return false
    }
    if (endTime && new Date(endTime) < new Date(item.pubDate)) {
      return false
    }
    if (startTime && new Date(startTime) > new Date(item.pubDate)) {
      return false
    }
    return true
  })
  parsed.feedLink = parsed.feedLink || url
  return parsed
}

module.exports = { parseFromQuery, parseFromString }
