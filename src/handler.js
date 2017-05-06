const request = require('superagent')
const url = require('url')
const { send } = require('micro')

const parsers = require('./parsers')
const transform = require('./transform')
const { EmptyHttpResponseError, EmptyParseOutputError, InvalidInputError, NotFoundError } = require('./errors')

async function parse (parser, text) {
  const parsed = await parsers[parser](text)
  if (!parsed) throw new EmptyParseOutputError()
  return transform(parsed)
}

module.exports = async function parseFromUrl(url) {
  const response = await request(url).buffer()
  if (!response.text) throw new EmptyHttpResponseError()
  if (response.notFound) throw new NotFoundError(url)

  let parsed
  try {
    parsed = await parse('rss-parser', response.text)
  } catch (error) {
    parsed = await parse('feedparser', response.text)
  }

  return parsed
}
