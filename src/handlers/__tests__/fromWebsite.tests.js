const fromWebsite = require('../fromWebsite');    

test('Should return feedUrl from any website which have a link to his rss feed', async () => {
    const feedUrls = await fromWebsite({websiteUrl: 'https://rolflekang.com'});

    expect(feedUrls).toContainEqual({link: 'https://rolflekang.com/localfeed.xml'});
});


test('Should return an empty array if website doesn\'t exist', async () => {
    const feedUrls = await fromWebsite({websiteUrl: 'https://foo.bar.baz'});

    expect(feedUrls).toHaveLength(0);
});