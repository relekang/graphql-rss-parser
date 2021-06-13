/* eslint-env jest */
import { parse } from '../jsonfeed-v1'
import request from '../../request'

test('should parse from rolflekang.com/feed.json', async () => {
  const fixture = await request('https://rolflekang.com/feed.json')

  expect(await parse(fixture.text)).toMatchSnapshot()
})
