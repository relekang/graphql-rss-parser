const axios = require('axios')

const { EmptyHttpResponseError, UpstreamHttpError } = require('./errors')

module.exports = async function request(url) {
  try {
    const response = await axios({
      url,
      headers: {
        'User-Agent': 'micro-rss-parser',
      },
    })

    if (!response.data) throw new EmptyHttpResponseError()
    if (!/2\d\d/.test(response.status)) {
      throw new UpstreamHttpError('Not found', response.status)
    }
    return {
      text: response.data,
      status: response.status,
      contentType: response.headers['content-type'],
      headers: response.headers,
    }
  } catch (error) {
    if (error.response && error.response) {
      throw new UpstreamHttpError('Upstream HTTP error', error.response.status)
    }
    throw error
  }
}
