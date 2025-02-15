import { makeExecutableSchema } from "@graphql-tools/schema";
import _debug from "debug";
import * as feed from "./handlers/feed.js";
import { findFeed } from "./handlers/findFeed.js";

const debug = _debug("graphql-rss-parser:schema");

const typeDefs = `
  enum Parser {
    FEEDPARSER
    RSS_PARSER
    FEEDME
    RSS_TO_JSON
    JSON_FEED_V1
  }

  type FindFeedResult {
    title: String
    link: String!
  }

  type FeedItem {
    id: String
    title: String
    url: String
    date_published: String
    guid: String
    author: String
    tags: [String!]!
  }

  type Feed {
    version: String
    title: String
    feed_url: String
    home_page_url: String
    parser: Parser
    author: String
    guid: String
    items: [FeedItem!]!
  }

  type Query {
    findFeed(url: String!): [FindFeedResult]!
    feed(url: String!, parser: Parser, startTime: String, endTime: String): Feed
  }
`;

const resolvers = {
	Query: {
		feed: (_parent: any, args: any) => {
			debug("query-resolver feed, query:", args);
			return feed.parseFromQuery(args);
		},
		findFeed: (_parent: any, args: any) => {
			debug("query-resolver findFeed, query:", args);
			return findFeed(args);
		},
	},
};

export const schema = makeExecutableSchema({
	typeDefs,
	resolvers,
});
