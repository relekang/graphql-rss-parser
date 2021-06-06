/* eslint-env jest */
import { parse } from '../rss-to-json'
import mockAxios from '../../__tests__/mockAxios'

test('should parse string from rolflekang.com/feed.xml', async () => {
  const fixture = await mockAxios({ url: 'https://rolflekang.com/feed.xml' })

  expect(await parse(fixture.data)).toMatchSnapshot()
})
