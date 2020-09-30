/* eslint-env jest */
const micro = require('micro')
const axios = require('axios')

const createHandler = require('../')
const parsers = require('../parsers')
const { listen } = require('./utils')

test('Same query should give same output for different parsers', async () => {
  const service = micro(createHandler({}))

  const { url, close } = await listen(service)

  const fields = ' title link feedLink entries { title link pubDate guid author categories }'
  const feedUrl = 'https://rolflekang.com/feed.xml'

  const query =
    'query TestQuery {' +
    parsers.keys
      .map((key) => `${key}: feed(url: "${feedUrl}", parser: ${key}) { ${fields} }`)
      .join('\n') +
    ' }'

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
        data: JSON.stringify({
          query,
        }),
      })
    ).data
  } catch (error) {
    if (!error.response) {
      throw error
    }

    response = error.response.data
  }
  close()

  expect(response.errors).toEqual(undefined)

  const keys = Object.keys(response.data)
  expect(keys).toEqual(parsers.keys)

  for (let i = 0; i < keys.length - 1; i++) {
    for (let j = 1; j < keys.length; j++) {
      try {
        expect(response.data[keys[i]]).toEqual(response.data[keys[j]])
      } catch (error) {
        console.error(keys[i], keys[j])
        throw error
      }
    }
  }
})
