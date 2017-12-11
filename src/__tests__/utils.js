/* eslint-env jest */
const micro = require('micro')
const request = require('superagent')

const createHandler = require('../')

const listen = server =>
  new Promise((resolve, reject) => {
    server.on('error', reject)

    server.listen(() => {
      const { port } = server.address()
      resolve({ url: `http://localhost:${port}`, close: () => server.close() })
    })
  })

function testGraphqlApi(strings, ...args) {
  const query = String.raw(strings, ...args)
  test(query, async () => {
    const service = micro(createHandler({}))

    const { url, close } = await listen(service)
    let response
    try {
      response = (await request
        .post(url)
        .set('User-Agent', 'graphql-test')
        .set('Content-Type', 'application/json')
        .send(JSON.stringify({ query: 'query TestQuery { ' + query + ' }' }))).body
    } catch (error) {
      if (!error.response) {
        throw error
      }

      response = error.response.body
    }
    close()
    expect(response).toMatchSnapshot()
  })
}

module.exports = { testGraphqlApi }
