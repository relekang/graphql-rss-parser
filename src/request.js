const axios = require('axios')

const { EmptyHttpResponseError, NotFoundError } = require('./errors')

module.exports = async function request(url) {
  const response = await axios({
    url,
    headers: {
      'User-Agent': 'micro-rss-parser',
    },
  })

  if (!response.data) throw new EmptyHttpResponseError()
  if (response.status === 404) throw new NotFoundError(url)

  return {
    text: response.data,
    status: response.status,
    contentType: response.headers['content-type'],
    headers: response.headers,
  }
}
