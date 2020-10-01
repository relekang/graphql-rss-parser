<h1 style="text-align: center;">
micro-rss-parser
<a href="https://www.npmjs.com/package/micro-rss-parser"><img src="https://img.shields.io/npm/v/micro-rss-parser.svg" alt="npm version"></a>
</h1>

A [graphql][] microservice that parses rss feeds and returns a JSON representation of the
given feed. It uses different parses installed from npm. When a parser fail it will try the next following this order: [feedparser][], [rss-parser][], [feedme][]. To specify a specific parser see example queries below.



## Installation

```shell
npm i -g micro-rss-parser
```

## Usage

### CLI for starting the server

```shell
$ micro-rss-parser --help

  Usage: micro-rss-parser [options] [command]

  Commands:

    help  Display help

  Options:

    -h, --help          Output usage information
    -H, --host [value]  Host to listen on (defaults to "0.0.0.0")
    -p, --port <n>      Port to listen on (defaults to 3000)
    -R, --raven-dsn     Raven DSN. This is used to configure logging with sentry.io
    -v, --version       Output the version number
```

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

##### Specifying the parser.
micro-rss-parser supports several of the rss parsers on npm. It can be specified with the parser option in a feed query as seen below.

Available parsers:

* `FEEDPARSER` - [feedparser][]
* `RSS_PARSER` - [rss-parser][]
* `FEEDME` - [feedme][]

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
