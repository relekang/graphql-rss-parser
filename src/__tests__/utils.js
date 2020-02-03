/* eslint-env jest */
const micro = require('micro')
const axios = require('axios')

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
      response = (
        await axios({
          url,
          method: 'post',
          headers: {
            'User-Agent': 'graphql-test',
            'Content-Type': 'application/json',
          },
          data: JSON.stringify({ query: 'query TestQuery { ' + query + ' }' }),
        })
      ).data
    } catch (error) {
      if (!error.response) {
        throw error
      }

      response = error.response.data
    }
    close()
    expect(response).toMatchSnapshot()
  })
}

module.exports = { testGraphqlApi }
