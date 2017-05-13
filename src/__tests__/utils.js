/* eslint-env jest */
const fs = require('fs-extra-promise')
const micro = require('micro')
const listen = require('test-listen')
const request = require('superagent')
const {resolve} = require('path')

const createHandler = require('../')
const {EmptyHttpResponseError, NotFoundError} = require('../errors')

async function mockRequest (url) {
  const path = resolve(__dirname, '../../__fixtures__', url.replace(/https?:\/\//, '').replace(/\//g, '_'))
  let content
  try {
    content = (await fs.readFileAsync(path)).toString()
  } catch (error) { }
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

function testGraphqlApi (strings, ...args) {
  const query = String.raw(strings, ...args)
  test(query, async () => {
    const service = micro(createHandler({}))

    const url = await listen(service)
    let response
    try {
      response = (await request
        .post(url)
        .set('User-Agent', 'graphql-test')
        .set('Content-Type', 'application/json')
        .send(JSON.stringify({ query: 'query TestQuery { ' + query + ' }' }))
      ).body
    } catch (error) {
      if (!error.response) {
        throw error
      }

      response = error.response.body
    }
    expect(response).toMatchSnapshot()
  })
}

module.exports = { testGraphqlApi, mockRequest }
