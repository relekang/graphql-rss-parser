import micro, { RequestHandler } from 'micro'
import { command, number, option, optional, run, string } from 'cmd-ts'
import { Options } from './index'

export function cli({
  version,
  createHandler,
}: {
  version: string
  createHandler: (options: Options) => RequestHandler
}) {
  const cmd = command({
    name: 'graphql-rss-parser',
    version,
    args: {
      port: option({
        short: 'p',
        long: 'port',
        description: 'Port to listen to',
        env: 'PORT',
        type: number,
        defaultValue() {
          return 3000
        },
      }),
      host: option({
        short: 'H',
        long: 'host',
        env: 'HOST',
        description: 'Host to listen to',
        defaultValue() {
          return '0.0.0.0'
        },
      }),
      sentryDsn: option({
        short: 'D',
        long: 'sentry-dsn',
        description: 'SENTRY DSN. This is used to configure logging with sentry.io',
        env: 'SENTRY_ENV',
        type: optional(string),
        defaultValue() {
          return undefined
        },
      }),
    },
    handler: (args) => {
      const server = micro(
        createHandler({
          version,
          sentryDsn: args.sentryDsn,
        })
      )

      console.log(`Starting graphql-rss-parser v${version}`)
      server.listen(args.port)
    },
  })
  return run(cmd, process.argv.slice(2))
}
