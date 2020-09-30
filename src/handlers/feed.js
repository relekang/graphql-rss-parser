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

async function parseFromQuery({ url, parser }) {
  const content = (await request(url)).text
  const parsed = await parseFromString({ content, parser })
  parsed.entries = parsed.entries.filter((item) => item != null)
  parsed.feedLink = parsed.feedLink || url
  return parsed
}
module.exports = { parseFromQuery, parseFromString }
