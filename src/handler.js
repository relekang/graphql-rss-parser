const url = require('url')
const { send } = require('micro')

const parsers = require('./parsers')
const transform = require('./transform')
const request = require('./request')
const { EmptyParseOutputError, NotFoundError } = require('./errors')

async function parse(parser, text) {
  const parsed = await parsers[parser](text)
  if (!parsed) throw new EmptyParseOutputError()
  return transform(parsed)
}

module.exports = async function parseFromQuery({ url, parser }) {
  const content = await request(url)
  let parsed
  if (parser) {
    parsed = await parse(parser, content)
  } else {
    try {
      parsed = await parse('FEEDPARSER', content)
    } catch (error) {
      parsed = await parse('RSS_PARSER', content)
    }
  }

  return parsed
}
