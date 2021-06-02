/* eslint-env jest */
const parse = require('../jsonfeed-v1')
const mockAxios = require('../../__tests__/mockAxios')

test('should parse from rolflekang.com/feed.json', async () => {
  const fixture = await mockAxios({ url: 'https://rolflekang.com/feed.json' })

  expect(await parse(fixture.data)).toMatchSnapshot()
})
