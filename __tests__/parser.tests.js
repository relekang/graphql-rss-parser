/* eslint-env jest */
const {parse, parseString} = require('../parser')
const rolflekangCom = require('./__fixtures__/rolflekang.com')

test('should parse rolflekang.com/feed.xml', async () => {
  const feed = await parse('https://rolflekang.com/feed.xml')
  expect(feed.title).toEqual('Writings of Rolf Erik Lekang')
})

test('should parse string from rolflekang.com/feed.xml', async () => {
  expect(await parseString(rolflekangCom)).toMatchSnapshot()
})
