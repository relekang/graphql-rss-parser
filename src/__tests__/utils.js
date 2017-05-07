/* eslint-env jest */
const micro = require('micro')
const listen = require('test-listen')
const request = require('superagent')
const createHandler = require('../')

function testGraphqlApi ([query]) {
  test(query, async () => {
    const service = micro(createHandler({}))

    const url = await listen(service)
    let response
    try {
      response = (await request
        .post(url)
        .set('Content-Type', 'application/json')
        .send(JSON.stringify({ query: 'query TestQuery { ' + query + ' }' }))
      ).body
    } catch (error) {
      console.log(error)
      response = error.response.body
    }
    expect(response.errors).toEqual(undefined)
    expect(response).toMatchSnapshot()
  })
}

module.exports = { testGraphqlApi }
