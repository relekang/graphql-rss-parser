const url = require('url');
const { sendError } = require('micro');
const { parse } = require('./parser');

const exampleLink = (host) => `http://${host}/?feed=https://rolflekang.com/feed.xml`;

module.exports = async (req, res) => {
  const { query } = url.parse(req.url, true);
  if (!query.feed) {
    return { usage: exampleLink(req.headers.host) };
  }

  try {
    return await parse(query.feed);
  } catch (error) {
    sendError(req, res, error);
  }
};
