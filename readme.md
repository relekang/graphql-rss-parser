# micro-rss-parser

[![Greenkeeper badge](https://badges.greenkeeper.io/relekang/micro-rss-parser.svg)](https://greenkeeper.io/)

A [graphql][] microservice that parses rss feeds and returns a JSON representation of the
given feed.

[graphql]: http://graphql.org/

## Installation

```shell
npm i -g micro-rss-parser
```

## Usage

### CLI for starting the server

```shell
$ micro-rss-parser --help

  Usage: micro-rss-parser [options] [command]

  Options:

    -h, --help          Output usage information
    -H, --host [value]  Host to listen on (defaults to "0.0.0.0")
    -p, --port <n>      Port to listen on (defaults to 3000)
    -R, --raven-dsn     Raven DSN
    -v, --version       Output the version number

```

### Example query
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

