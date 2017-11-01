const superagent = require('superagent')

const { EmptyHttpResponseError, NotFoundError } = require('./errors')

module.exports = async function request (url) {
  const response = await superagent(url).buffer()

  if (!response.text) throw new EmptyHttpResponseError()
  if (response.notFound) throw new NotFoundError(url)

  return {text: response.text, status: response.status, contentType: response.headers["content-type"]}
}
