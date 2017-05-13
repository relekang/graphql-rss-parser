# micro-rss-parser

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

#### feed(url: String)
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

#### findFeed(url: String)
```graphql
{
  findFeed(url: "https://rolflekang.com") {
    link
  }
}
```
