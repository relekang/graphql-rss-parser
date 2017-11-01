/* eslint-env jest */
const parse = require('../rss-parser')
const mockRequest = require('../../__tests__/mockRequests')

test('should parse string from rolflekang.com/feed.xml', async () => {
  const fixture = await mockRequest('https://rolflekang.com/feed.xml')

  expect(await parse(fixture.text)).toMatchSnapshot()
})

test.skip('should parse string from google.blogspot.com/feeds/posts/default', async () => {
  const fixture = await mockRequest('http://google.blogspot.com/feeds/posts/default')

  expect(await parse(fixture.text)).toMatchSnapshot()
})
