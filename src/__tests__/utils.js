/* eslint-env jest */
const micro = require('micro')
const listen = require('test-listen')
const request = require('superagent')

const createHandler = require('../')

function testGraphqlApi(strings, ...args) {
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
        .send(JSON.stringify({ query: 'query TestQuery { ' + query + ' }' })))
        .body
    } catch (error) {
      if (!error.response) {
        throw error
      }

      response = error.response.body
    }
    expect(response).toMatchSnapshot()
  })
}

module.exports = { testGraphqlApi }
