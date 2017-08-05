/* eslint-env jest */
require('../../__tests__/mockRequests')

const findFeed = require('../findFeed')

test('findFeed should return feedUrl from any website which have a link to his rss feed', async () => {
  const feedUrls = await findFeed({url: 'https://rolflekang.com'})

  expect(feedUrls).toEqual([{link: 'https://rolflekang.com/feed.xml'}])
})

test('findFeed should return full link to feed', async () => {
  const feedUrls = await findFeed({url: 'https://xkcd.com'})

  expect(feedUrls).toEqual([
    {link: 'https://xkcd.com/atom.xml'},
    {link: 'https://xkcd.com/rss.xml'}
  ])
})

test('findFeed should return an empty array if website doesn\'t exist', async () => {
  const feedUrls = await findFeed({url: 'https://rolflekang.no'})

  expect(feedUrls).toHaveLength(0)
})
