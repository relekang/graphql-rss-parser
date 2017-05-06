/* eslint-env jest */
const micro = require('micro')
const listen = require('test-listen')
const request = require('superagent')
const createHandler = require('../')

async function apiRequest (path, handlerOptions) {
  const service = micro(createHandler(handlerOptions || {}))

  const url = await listen(service)
  return request(url + path)
}

test('GET /', async () => {
  const response = await apiRequest('/')

  expect(response.body.usage).toContain('localhost')
  expect(response.body.usage).toContain('/?feed=https://rolflekang.com/feed.xml')
})

test('GET /?feed=https://rolflekang.com/feed.xml', async () => {
  const response = await apiRequest('/?feed=https://rolflekang.com/feed.xml')

  expect(response.body).toMatchSnapshot()
})
