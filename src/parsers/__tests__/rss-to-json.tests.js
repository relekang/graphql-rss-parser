/* eslint-env jest */
const parse = require('../rss-to-json')
const mockAxios = require('../../__tests__/mockAxios')

test('should parse string from rolflekang.com/feed.xml', async () => {
  const fixture = await mockAxios({ url: 'https://rolflekang.com/feed.xml' })

  expect(await parse(fixture.data)).toMatchSnapshot()
})
