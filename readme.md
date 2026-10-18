<h1 style="text-align: center;">
graphql-rss-parser
<a href="https://www.npmjs.com/package/graphql-rss-parser"><img src="https://img.shields.io/npm/v/graphql-rss-parser.svg" alt="npm version"></a>
</h1>

A [graphql][] microservice that parses rss feeds and returns a JSON representation of the
given feed. It uses different parses installed from npm. When a parser fail it will try the next following this order: [feedparser][], [rss-parser][], [feedme][], [rss-to-json][]. To specify a specific parser see example queries below.

## Installation

```shell
npm i -g graphql-rss-parser
```

## Usage

### CLI for starting the server

```shell
$ graphql-rss-parser --help

OPTIONS:
  --port, -p <number>    - Port to listen to [env: PORT] [optional]
  --host, -H <str>       - Host to listen to [env: HOST] [optional]
  --sentry-dsn, -D <str> - SENTRY DSN. This is used to configure logging with sentry.io [env: SENTRY_ENV] [optional]
  --log-level, -L <str>  - "fatal" | "error" | "warn" | "info" | "debug" | "trace" | "silent" [env: LOG_LEVEL] [optional]

FLAGS:
  --csrf-prevention, -C - Toggle for CSRF prevention [env: CSRF_PREVENTION]
  --pretty-log, -P      - Log human readable instead of JSON [env: PRETTY_LOG]
  --help, -h            - show help
  --version, -v         - print the version
```

### Sentry integration

The sentry integration can be enabled by passing the `-D/--sentry-dsn` cli option. It is important to note
that errors that happens because errors in parsers or http requests will be filtered out. This is because
the goal of this error tracking is to catch errors in the code of the service.

### Feed discovery limits

Discovery checks the first 32 unique alternate-link candidates on each page by default, with at most four active candidates per batch. Set `FEED_DISCOVERY_MAX_CANDIDATES` to a positive safe integer to change the candidate limit. Unset or invalid values use the default of 32. RSS and Atom links share the default parser mode; JSON links use a separate mode. Results keep RSS/Atom link order, followed by JSON link order. Duplicate URLs in the same parser mode produce one result. Distinct query strings stay separate.

Guessed feed paths are normalized and deduplicated, with at most four active guesses per batch. These are local batch limits, not process-wide resource limits. Concurrent discovery calls and linked pages can start separate batches.

### Example queries

#### feed(url: String, [parser: Parser])

```graphql
{
  feed(url: "https://rolflekang.com/feed.xml") {
    title
    entries {
      title
      pubDate
      link
    }
  }
}
```

##### Specifying the parser

graphql-rss-parser supports several of the rss parsers on npm. It can be specified with the parser option in a feed query as seen below.

Available parsers:

* `FEEDPARSER` - [feedparser][]
* `RSS_PARSER` - [rss-parser][]
* `FEEDME` - [feedme][]
* `RSS_TO_JSON` - [rss-to-json][]
* `JSON_FEED_V1` - internal see `src/parsers/jsonfeed-v1.ts`

```graphql
{
  feed(url: "https://rolflekang.com/feed.xml", parser: FEEDPARSER) {
    entries {
      link
    }
  }
}
```

#### findFeed(url: String)

```graphql
{
  findFeed(url: "https://rolflekang.com") {
    link
  }
}
```

[graphql]: http://graphql.org/
[feedparser]: https://www.npmjs.com/package/feedparser
[rss-parser]: https://www.npmjs.com/package/rss-parser
[feedme]: https://www.npmjs.com/package/feedme
[rss-to-json]: https://www.npmjs.com/package/rss-to-json
