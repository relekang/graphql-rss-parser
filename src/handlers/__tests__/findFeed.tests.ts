/* eslint-env jest */
import '../../__tests__/mockAxios'

import { findFeed, normalizeFeedLink } from '../findFeed'
import { DnsLookupError } from '../../errors'

test('findFeed should return feedUrl from any website which have a link to its rss feed', async () => {
  const feeds = await findFeed({ url: 'https://rolflekang.com' })

  expect(feeds).toEqual([
    {
      link: 'https://rolflekang.com/feed.xml',
      title: 'Writing by Rolf Erik Lekang',
    },
    {
      link: 'https://rolflekang.com/feed.json',
      title: 'Writing by Rolf Erik Lekang',
    },
  ])
})

test('findFeed should work with feeds', async () => {
  const feeds = await findFeed({ url: 'https://rolflekang.com/feed.xml' })

  expect(feeds).toEqual([
    {
      link: 'https://rolflekang.com/feed.xml',
      title: 'Writing by Rolf Erik Lekang',
    },
  ])
})

test('findFeed should work with json feeds', async () => {
  const feeds = await findFeed({ url: 'https://rolflekang.com/feed.json' })

  expect(feeds).toEqual([
    {
      link: 'https://rolflekang.com/feed.json',
      title: 'Writing by Rolf Erik Lekang',
    },
  ])
})

test('findFeed should work with double slashes', async () => {
  const feeds = await findFeed({ url: 'https://rolflekang.com//feed.xml' })

  expect(feeds).toEqual([
    {
      link: 'https://rolflekang.com/feed.xml',
      title: 'Writing by Rolf Erik Lekang',
    },
  ])
})

test('findFeed should work html response', async () => {
  const feeds = await findFeed({ url: 'https://rolflekang.com/writing/' })

  expect(feeds).toEqual([
    {
      link: 'https://rolflekang.com/feed.xml',
      title: 'Writing by Rolf Erik Lekang',
    },
    {
      link: 'https://rolflekang.com/feed.json',
      title: 'Writing by Rolf Erik Lekang',
    },
  ])
})

test('findFeed should return full link to feed', async () => {
  const feeds = await findFeed({ url: 'https://xkcd.com' })

  expect(feeds).toEqual([
    { link: 'https://xkcd.com/atom.xml', title: 'xkcd.com' },
    { link: 'https://xkcd.com/rss.xml', title: 'xkcd.com' },
  ])
})

test('findFeed should not add double slash when building link', async () => {
  const feeds = await findFeed({ url: 'https://xkcd.com/' })

  expect(feeds).toEqual([
    { link: 'https://xkcd.com/atom.xml', title: 'xkcd.com' },
    { link: 'https://xkcd.com/rss.xml', title: 'xkcd.com' },
  ])
})

test('findFeed should return an error', async () => {
  const request = findFeed({ url: 'https://q.rolflekang.no' })

  await expect(request).rejects.toEqual(new DnsLookupError())
})

test('findFeed should work with feedburner', async () => {
  const feeds = await findFeed({
    url: 'http://feeds.feedburner.com/zenhabits',
  })

  expect(feeds).toEqual([{ title: 'zen habits', link: 'http://feeds.feedburner.com/zenhabits' }])
})

const testData: [[string, string | undefined], string][] = [
  [['https://example.com', 'feed.xml'], 'https://example.com/feed.xml'],
  [['https://example.com', '/feed.xml'], 'https://example.com/feed.xml'],
  [['https://example.com', 'https://example.com/feed.xml'], 'https://example.com/feed.xml'],
]
testData.forEach(([input, expected]) => {
  test(`normalizeFeedLink should return the normalized link for ${input.join(',')}`, () => {
    expect(normalizeFeedLink(...input)).toEqual(expected)
  })
})
