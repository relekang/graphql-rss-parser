/* eslint-env jest */
const fs = require('fs-extra-promise')
const {resolve} = require('path')
const request = require('superagent')

const {EmptyHttpResponseError, NotFoundError} = require('../errors')

async function mockRequest (url) {
  const path = resolve(__dirname, '../../__fixtures__', url.replace(/https?:\/\//, '').replace(/\//g, '_'))
  let content
  try {
    content = (await fs.readFileAsync(path)).toString()
  } catch (error) {
    if (process.env.DEBUG_MOCKS) console.log(error)
  }
  if (!content) {
    const response = await request(url).buffer()

    if (!response.text) throw new EmptyHttpResponseError()
    if (response.notFound) throw new NotFoundError(url)

    content = response.text
    await fs.writeFileAsync(path, content)
  }

  return content
}

jest.mock('../request', () => mockRequest)

module.exports = mockRequest
