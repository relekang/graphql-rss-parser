<h1 style="text-align: center;">
graphql-rss-parser
<a href="https://github.com/relekang/graphql-rss-parser/releases"><img src="https://img.shields.io/github/v/release/relekang/graphql-rss-parser" alt="Latest release"></a>
</h1>

A [graphql][] microservice that parses rss feeds and returns a JSON representation of the
given feed. It uses different parses installed from npm. When a parser fail it will try the next following this order: [feedparser][], [rss-parser][], [feedme][], [rss-to-json][]. To specify a specific parser see example queries below.

## Installation

New releases are available as Docker images. npm publishing has stopped.

```shell
docker run --rm -p 3000:3000 relekang/graphql-rss-parser:latest
```

Use a version tag, such as `v4.5.0`, instead of `latest` to select a specific release. Check [GitHub releases](https://github.com/relekang/graphql-rss-parser/releases) for available versions.

To run from source, use Node.js 22.18.0 or later:

```shell
npm ci
npm run build
npm start
```

## Releases

Release Please opens and updates a release PR from Conventional Commits on `main`. The PR updates `package.json`, `package-lock.json`, and `changelog.md`. Merge the PR to create a version tag and a GitHub release. The same workflow then publishes the Docker image with the version tag and `latest`. It does not publish to npm. `package.json` also sets `private: true` to prevent accidental npm publishing.

Configure these repository Actions secrets before you enable releases:

- `RELEASE_PLEASE_TOKEN`: A fine-grained GitHub token with access to this repository, Contents read/write, and Pull requests read/write. A separate token lets release PRs and tags trigger CI workflows.
- `DOCKERHUB_USERNAME`: The Docker Hub account name.
- `DOCKERHUB_PASSWORD`: A Docker Hub access token with write access to `relekang/graphql-rss-parser`.

The release workflow builds from the release tag. Docker publishing runs in the same workflow so it does not depend on a second tag-triggered workflow. If Docker publishing fails after a GitHub release is created, use **Re-run failed jobs** on that workflow run.

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

The default log format is JSON at level `info`. Use `--log-level` or `LOG_LEVEL` to change the level. Use `--pretty-log` or `PRETTY_LOG=true` for human-readable logs; this starts the `pino-pretty` transport.

Response error stacks are included only when `NODE_ENV=development`. Other modes, including an unset `NODE_ENV`, omit response stacks. Server-side error logging and Sentry reporting remain enabled.

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
- `FEEDPARSER` - [feedparser][]
- `RSS_PARSER` - [rss-parser][]
- `FEEDME` - [feedme][]
- `RSS_TO_JSON` - [rss-to-json][]
- `JSON_FEED_V1` - internal see `src/parsers/jsonfeed-v1.ts`

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
