const Readable = require('stream').Readable;
const FeedParser = require('feedparser');
const request = require('superagent');


function transform(feed) {
  return Object.keys(feed)
    .reduce((lastValue, key) =>
      Object.assign({}, lastValue, !/rss|@|#|atom/.test(key) && { [key]: feed[key] }),
      {}
    );
  return feed;
}

function parseString(feed) {
  return new Promise((resolve, reject) => {
    const feedparser = new FeedParser();
    feedparser.on('error', error => {
      throw error;
    });

    let parsedFeed;
    feedparser.on('readable', function() {
      const meta = this.meta;
      if (!parsedFeed) {
        parsedFeed = Object.assign({}, meta, { items: [] });
      }

      let item;
      while ((item = this.read())) {
        delete item.meta;
        parsedFeed.items.push(transform(item));
      }
    });

    feedparser.on('end', function() {
      resolve(parsedFeed);
    });

    const stream = new Readable();
    stream.pipe(feedparser);
    stream.push(feed);
    stream.push(null);
  });
}

async function parse(url) {
  const response = await request(url).buffer();
  const parsed = await parseString(response.text);
  return transform(parsed)
}

module.exports = { parse, parseString };
