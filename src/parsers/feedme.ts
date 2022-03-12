import _debug from 'debug';
import { Readable } from 'stream';
import FeedMe from 'feedme';
import { FeedObject } from 'feedme/dist/parser';

import { EmptyParserOutputError, ParserError } from '../errors';
import { Item, ParserResponse } from '../types';

const debug = _debug('graphql-rss-parser:parsers:feedme');

const findHtmlLink = (array: FeedObject[]): string | undefined => {
  const link = array.find(
    (item) =>
      typeof item === 'object' &&
      item['rel'] === 'alternate' &&
      item['type'] === 'text/html'
  );
  if (typeof link === 'object' && typeof link?.['href'] === 'string') {
    return link?.['href'] || undefined;
  }
  return undefined;
};

function evaluateLink(link: FeedObject | FeedObject[] | undefined): string {
  if (Array.isArray(link)) {
    const htmlLink = findHtmlLink(link);
    if (htmlLink) {
      return htmlLink;
    }
  }
  if (typeof link === 'string') {
    return link;
  }
  throw new ParserError(new Error('Missing link'), 'FEEDME');
}

function unpack(
  input: FeedObject | FeedObject[] | undefined,
  attribute: string,
  required: true,
  key: string
): string;
function unpack(
  input: FeedObject | FeedObject[] | undefined,
  attribute: string,
  required?: false
): string | undefined;
function unpack(
  input: FeedObject | FeedObject[] | undefined,
  attribute: string,
  required?: boolean,
  key?: string
): string | undefined {
  let output = undefined;
  if (input && Array.isArray(input)) {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    output = unpackArray(input, attribute)[0];
  }
  if (typeof input === 'string') {
    output = input;
  }
  // @ts-ignore ---
  if (typeof input === 'object' && typeof input[attribute] === 'string') {
    // @ts-ignore ---
    output = input[attribute] as string | undefined;
  }

  if (required && !output) {
    throw new ParserError(new Error(`Missing field ${key}`), 'FEEDME');
  }

  return output;
}

function unpackArray(
  input: FeedObject | FeedObject[] | undefined,
  attribute: string
): string[] {
  if (Array.isArray(input)) {
    return input
      .map((item) => unpack(item, attribute))
      .filter((item): item is string => !!item);
  }
  if (typeof input === 'string') {
    const unpacked = unpack(input, attribute);
    return unpacked ? [unpacked] : [];
  }
  return [];
}

export function parse(feed: string): Promise<ParserResponse> {
  return new Promise((resolve, reject) => {
    debug('starting to parse');
    try {
      if (feed.includes('medium.com')) {
        throw new Error('Failed to parse');
      }

      const parser = new FeedMe(true);

      parser.on('end', () => {
        const parsed = parser.done();
        if (!parsed) {
          return reject(new EmptyParserOutputError());
        }
        debug('done parsing');
        try {
          resolve({
            parser: 'FEEDME',
            title: unpack(parsed['title'], 'text', true, 'title'),
            description: unpack(parsed['description'], 'text'),
            home_page_url: evaluateLink(parsed['link']),
            feed_url: undefined,
            items: parsed.items.map((item): Item => {
              const pubDate = unpack(item['pubdate'], 'text');
              return {
                title: unpack(item['title'], 'text'),
                url: evaluateLink(item['link']),
                id: unpack(item['id'] || item['guid'], 'text', true, 'id'),
                content_html: unpack(item['description'], 'text'),
                tags: unpackArray(item['category'], 'text'),
                date_published: pubDate
                  ? new Date(pubDate).toISOString()
                  : pubDate,
                authors: unpack(item['author'], 'name')
                  ? [{ name: unpack(item['author'], 'name') }]
                  : [],
              };
            }),
          });
        } catch (error: any) {
          reject(new ParserError(error, 'FEEDME'));
        }
      });

      parser.on('error', (error) => {
        debug('parsing failed with error', error);
        reject(new ParserError(error, 'FEEDME'));
      });

      const stream = new Readable();
      stream.pipe(parser);
      stream.push(feed);
      stream.push(null);
    } catch (error) {
      debug('parsing failed with error', error);
      reject(error);
    }
  });
}
