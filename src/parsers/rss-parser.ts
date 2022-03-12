import Parser from 'rss-parser';
import _debug from 'debug';

import { EmptyParserOutputError, NotAFeedError, ParserError } from '../errors';
import { Item, ParserResponse } from '../types';

const debug = _debug('graphql-rss-parser:parsers:rss-parser');

const parser = new Parser();

function getPubDate(entry: Parser.Item): string | undefined {
  if (entry.isoDate) {
    return entry.isoDate;
  }
  try {
    return entry.pubDate
      ? new Date(entry.pubDate?.replace(/CES?T/, '(CET)')).toISOString()
      : entry.pubDate;
  } catch (error) {
    return entry.pubDate;
  }
}

function transform(
  parsed: Parser.Output<{ 'dc:creator'?: string }>
): ParserResponse {
  const items = parsed.items.map(
    (item): Item => ({
      title: item.title,
      content_html: item.content,
      url: item.link as string,
      id: item.guid as string,
      tags: item.categories || [],
      authors:
        item.creator || item['dc:creator']
          ? [{ name: item.creator || item['dc:creator'] }]
          : [],
      date_published: getPubDate(item),
    })
  );
  return {
    parser: 'RSS_PARSER',
    title: parsed.title || '',
    description: parsed.description,
    home_page_url: parsed.link,
    feed_url: parsed.feedUrl,
    items,
  };
}

export function parse(document: string): Promise<ParserResponse> {
  return new Promise((resolve, reject) => {
    debug('starting to parse');
    parser.parseString(document, function (error, parsed) {
      if (error) {
        debug('parsing failed with error', error);
        if (/Line:/.test(error.message) && /Column:/.test(error.message)) {
          return reject(new NotAFeedError());
        }
        return reject(new ParserError(error, 'RSS_PARSER'));
      }

      if (!parsed) {
        return reject(new EmptyParserOutputError());
      }

      debug('done parsing');
      resolve(transform(parsed));
    });
  });
}
