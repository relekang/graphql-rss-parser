/* eslint-env jest */
const findFeed = require('../findFeed')

test('Should return feedUrl from any website which have a link to his rss feed', async () => {
  const feedUrls = await findFeed({url: 'https://rolflekang.com'})

  expect(feedUrls).toContainEqual({link: 'https://rolflekang.com/feed.xml'})
})

test('Should return an empty array if website doesn\'t exist', async () => {
  const feedUrls = await findFeed({url: 'https://rolflekang.no'})

  expect(feedUrls).toHaveLength(0)
})
