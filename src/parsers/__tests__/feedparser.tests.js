/* eslint-env jest */
const parse = require('../feedparser')
const rolflekangCom = require('./__fixtures__/rolflekang.com')

test('should parse string from rolflekang.com/feed.xml', async () => {
  expect(await parse(rolflekangCom)).toMatchSnapshot()
})
