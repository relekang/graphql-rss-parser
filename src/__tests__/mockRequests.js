/* eslint-env jest */
const fs = require('fs-extra-promise')
const { resolve } = require('path')
const axios = require('axios')

const { EmptyHttpResponseError, NotFoundError } = require('../errors')

async function mockRequest(url) {
  const path = resolve(
    __dirname,
    '../../__fixtures__',
    url.replace(/https?:\/\//, '').replace(/\//g, '_')
  )
  let content
  try {
    content = JSON.parse((await fs.readFileAsync(path)).toString())
  } catch (error) {
    // eslint-disable-next-line no-console
    if (process.env.DEBUG_MOCKS) console.log(error)
  }
  if (!content) {
    const response = await axios({
      url,
      headers: {
        'User-Agent': 'micro-rss-parser',
      },
    })

    if (!response.data) throw new EmptyHttpResponseError()
    if (response.status === 404) throw new NotFoundError(url)

    content = {
      text: response.data,
      status: response.status,
      contentType: response.headers['content-type'],
      headers: response.headers,
    }
    await fs.writeFileAsync(path, JSON.stringify(content, null, 2))
  }

  return content
}

jest.mock('../request', () => mockRequest)

module.exports = mockRequest
