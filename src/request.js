const axios = require('./axios')

const {
  UnknownRequestError,
  EmptyHttpResponseError,
  UpstreamHttpError,
  DnsLookupError,
  ConnectionRefusedError,
} = require('./errors')

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
    if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test') {
      console.log(error)
    }
    if (error.response && error.response) {
      throw new UpstreamHttpError('Upstream HTTP error', error.response.status)
    }
    if (error.code === 'ENOTFOUND' || error.code === 'EAI_AGAIN') {
      throw new DnsLookupError()
    }
    if (error.code === 'ECONNREFUSED') {
      throw new ConnectionRefusedError()
    }

    throw new UnknownRequestError(error)
  }
}
