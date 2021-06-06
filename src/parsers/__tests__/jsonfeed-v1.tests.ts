/* eslint-env jest */
import { parse } from '../jsonfeed-v1'
import mockAxios from '../../__tests__/mockAxios'

test('should parse from rolflekang.com/feed.json', async () => {
  const fixture = await mockAxios({ url: 'https://rolflekang.com/feed.json' })

  expect(await parse(fixture.data)).toMatchSnapshot()
})
