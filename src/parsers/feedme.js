const debug = require('debug')('micro-rss-parser:parsers:feedme')
const Readable = require('stream').Readable
const FeedMe = require('feedme')
const find = require('lodash/fp/find')
const get = require('lodash/fp/get')

const { ParserError } = require('../errors')

const findHtmlLink = find({ rel: 'alternate', type: 'text/html' })
function evaluateLink(link) {
  return Array.isArray(link) ? get('href')(findHtmlLink(link)) : link
}

module.exports = function parseString(feed) {
  return new Promise((resolve, reject) => {
    debug('starting to parse')
    try {
      if (feed.includes('medium.com')) {
        throw new Error('Failed to parse')
      }

      const parser = new FeedMe()

      const parsed = {
        parser: 'FEEDME',
        link: [],
        entries: [],
      }

      parser.on('title', (title) => {
        parsed.title = title
      })
      parser.on('description', (description) => {
        parsed.description = description
      })

      parser.on('link', (link) => {
        if (typeof link === 'string') {
          parsed.link = link
        } else {
          parsed.link.push(link)
        }
      })

      parser.on('item', (item) => {
        try {
          let pubDate = item.pubdate || item.published

          try {
            pubDate = new Date(pubDate).toISOString()
          } catch (error) {
            // pubdata will be the broken date
          }

          parsed.entries = [
            ...parsed.entries,
            {
              title: item.title,
              link: evaluateLink(item.link),
              guid: item.guid && item.guid.text,
              description: item.description,
              categories: typeof item.category === 'string' ? [item.category] : item.category || [],
              pubDate,
              author: item.author ? item.author.name || item.author : item['dc:creator'],
            },
          ]
        } catch (error) {
          debug('parsing failed with error', error)
          reject(new ParserError(error, 'FEEDME'))
        }
      })

      parser.on('end', () => {
        parsed.link = evaluateLink(parsed.link)
        debug('done parsing')
        resolve(parsed)
      })

      parser.on('error', (error) => {
        debug('parsing failed with error', error)
        reject(new ParserError(error, 'FEEDME'))
      })

      const stream = new Readable()
      stream.pipe(parser)
      stream.push(feed)
      stream.push(null)
    } catch (error) {
      debug('parsing failed with error', error)
      reject(error)
    }
  })
}
