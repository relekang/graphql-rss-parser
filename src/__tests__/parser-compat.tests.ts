/* eslint-env jest */
import micro from 'micro'
import axios from 'axios'

import createHandler from '../'
import { parserKeys } from '../parsers'
import { listen } from './utils'
import { ParserKey } from '../types'

test('Same query should give same output for different parsers', async () => {
  const service = micro(createHandler({ version: 'version' }))

  const { url, close } = await listen(service)

  const fields = ' title link feedLink entries { title link pubDate author categories }'
  const feedUrl = 'https://rolflekang.com/feed.xml'

  const query =
    'query TestQuery {' +
    parserKeys
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
  expect(keys).toEqual(parserKeys)

  for (let i = 0; i < keys.length - 1; i++) {
    for (let j = 1; j < keys.length; j++) {
      try {
        expect(response.data[keys[i] as ParserKey]).toEqual(response.data[keys[j] as ParserKey])
      } catch (error) {
        console.error(keys[i], keys[j])
        throw error
      }
    }
  }
})
