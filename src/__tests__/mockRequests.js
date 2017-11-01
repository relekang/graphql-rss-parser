/* eslint-env jest */
const fs = require('fs-extra-promise')
const {resolve} = require('path')
const request = require('superagent')

const {EmptyHttpResponseError, NotFoundError} = require('../errors')

async function mockRequest (url) {
  const path = resolve(__dirname, '../../__fixtures__', url.replace(/https?:\/\//, '').replace(/\//g, '_'))
  let content
  try {
    content = JSON.parse((await fs.readFileAsync(path)).toString())
  } catch (error) {
    if (process.env.DEBUG_MOCKS) console.log(error)
  }
  if (!content) {
    const response = await request(url).buffer()

    if (!response.text) throw new EmptyHttpResponseError()
    if (response.notFound) throw new NotFoundError(url)

    content = {text: response.text, status: response.status, contentType: response.headers["content-type"]} 
    await fs.writeFileAsync(path, JSON.stringify(content, null, 2))
  }

  return content
}

jest.mock('../request', () => mockRequest)

module.exports = mockRequest
