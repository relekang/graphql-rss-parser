/* eslint-env jest */
const parse = require('../feedparser')
const mockRequest = require('../../__tests__/mockRequests')

test('should parse string from rolflekang.com/feed.xml', async () => {
  const fixture = await mockRequest('https://rolflekang.com/feed.xml')

  expect(await parse(fixture)).toMatchSnapshot()
})
