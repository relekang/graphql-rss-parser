const axios = require('./axios')
const debug = require('debug')('graphql-rss-parser:request')

const {
  ConnectionRefusedError,
  DnsLookupError,
  EmptyHttpResponseError,
  UnknownRequestError,
  UpstreamHttpError,
  TimeoutError,
} = require('./errors')

const TIMEOUT = 30 * 1000

module.exports = async function request(url) {
  try {
    debug(`requesting ${url}`)
    const response = await axios({
      url,
      headers: {
        'User-Agent': 'graphql-rss-parser',
      },
      timeout: TIMEOUT,
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
    if (error.response && error.response.status) {
      throw new UpstreamHttpError('Upstream HTTP error', error.response.status)
    }
    if (error.code === 'ENOTFOUND' || error.code === 'EAI_AGAIN') {
      throw new DnsLookupError()
    }
    if (error.code === 'ECONNREFUSED' || error.code === 'ECONNRESET') {
      throw new ConnectionRefusedError()
    }

    if (error.code === 'ECONNABORTED' || error.code === 'ETIMEDOUT') {
      throw new TimeoutError()
    }

    if (error.constructor === EmptyHttpResponseError || error.constructor === UpstreamHttpError) {
      throw error
    }

    throw new UnknownRequestError(error)
  }
}
