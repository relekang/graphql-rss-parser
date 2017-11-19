/* eslint-env jest */
require('../../__tests__/mockRequests')

const findFeed = require('../findFeed')

test('findFeed should return feedUrl from any website which have a link to its rss feed', async () => {
  const feeds = await findFeed({ url: 'https://rolflekang.com' })

  expect(feeds).toEqual([
    {
      link: 'https://rolflekang.com/feed.xml',
      title: 'Writings of Rolf Erik Lekang',
    },
  ])
})

test('findFeed should work with feeds', async () => {
  const feeds = await findFeed({ url: 'https://rolflekang.com//feed.xml' })

  expect(feeds).toEqual([
    {
      link: 'https://rolflekang.com/feed.xml',
      title: 'Writings of Rolf Erik Lekang',
    },
  ])
})

test('findFeed should work with double slashes', async () => {
  const feeds = await findFeed({ url: 'https://rolflekang.com//feed.xml' })

  expect(feeds).toEqual([
    {
      link: 'https://rolflekang.com/feed.xml',
      title: 'Writings of Rolf Erik Lekang',
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

test("findFeed should return an empty array if website doesn't exist", async () => {
  const feeds = await findFeed({ url: 'https://rolflekang.no' })

  expect(feeds).toHaveLength(0)
})

test('findFeed should work with feedburner', async () => {
  const feeds = await findFeed({
    url: 'http://feeds.feedburner.com/zenhabits',
  })

  expect(feeds).toEqual([
    { title: 'zen habits', link: 'http://feeds.feedburner.com/zenhabits' },
  ])
})
