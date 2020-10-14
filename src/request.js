const axios = require('./axios')
const debug = require('debug')('graphql-rss-parser:request')

const {
  UnknownRequestError,
  EmptyHttpResponseError,
  UpstreamHttpError,
  DnsLookupError,
  ConnectionRefusedError,
} = require('./errors')

module.exports = async function request(url) {
  try {
    debug(`requesting ${url}`)
    const response = await axios({
      url,
      headers: {
        'User-Agent': 'graphql-rss-parser',
      },
    })
    debug(`response from ${url} status-code=${response.status}`)
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
    debug(`request to ${url} failed with error`, error)
    if (error.response && error.response) {
      throw new UpstreamHttpError('Upstream HTTP error', error.response.status)
    }
    if (error.code === 'ENOTFOUND' || error.code === 'EAI_AGAIN') {
      throw new DnsLookupError()
    }
    if (error.code === 'ECONNREFUSED' || error.code === 'ECONNRESET') {
      throw new ConnectionRefusedError()
    }

    throw new UnknownRequestError(error)
  }
}
