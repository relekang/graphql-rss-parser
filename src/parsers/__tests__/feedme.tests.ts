/* eslint-env jest */
import { parse } from '../feedme'
import mockAxios from '../../__tests__/mockAxios'

test('should parse string from rolflekang.com/feed.xml', async () => {
  const fixture = await mockAxios({ url: 'https://rolflekang.com/feed.xml' })

  expect(await parse(fixture.data)).toMatchSnapshot()
})

test('should parse string from google.blogspot.com/feeds/posts/default', async () => {
  const fixture = await mockAxios({ url: 'http://google.blogspot.com/feeds/posts/default' })

  expect(await parse(fixture.data)).toMatchSnapshot()
})
