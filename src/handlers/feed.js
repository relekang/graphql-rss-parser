const parsers = require('../parsers')
const transform = require('../transform')
const request = require('../request')
const { ConnectionFailedError, EmptyParseOutputError } = require('../errors')

async function parse (parser, text) {
  const parsed = await parsers[parser](text)
  if (!parsed) throw new EmptyParseOutputError()
  return transform(parsed)
}

module.exports = async function parseFromQuery ({ url, parser }) {
  let content
  try {
    content = await request(url)
  } catch (error) {
    if (error.code === 'ENOTFOUND') {
      throw new ConnectionFailedError(url)
    }
    throw error
  }

  if (parser) {
    return parse(parser, content)
  } else {
    for (let i = 0; i < parsers.keys.length; i++) {
      try {
        return parse(parsers.keys[i], content)
      } catch (error) {
        if (i !== parsers.keys.length - 1) {
          throw error
        }
        continue
      }
    }
  }
}
