import _debug from 'debug';
import { parse as FEEDME } from './feedme';
import { parse as RSS_PARSER } from './rss-parser';
import { parse as FEEDPARSER } from './feedparser';
import { parse as RSS_TO_JSON } from './rss-to-json';
import { parse as JSON_FEED_V1 } from './jsonfeed-v1';
import { Parser, ParserKey } from '../types';

const debug = _debug('graphql-rss-parser:parsers');

export const parserKeys: ParserKey[] = [
  'FEEDPARSER',
  'RSS_PARSER',
  'FEEDME',
  'RSS_TO_JSON',
];

debug('active parsers:', parserKeys);

export const parsers: { [key in ParserKey]: Parser } = {
  RSS_PARSER,
  FEEDPARSER,
  FEEDME,
  RSS_TO_JSON,
  JSON_FEED_V1,
};
