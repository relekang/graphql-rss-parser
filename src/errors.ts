import { getReasonPhrase } from 'http-status-codes'
import _debug from 'debug'
import { ParserKey } from './types'

const debug = _debug('graphql-rss-parser:errors')
const development = !process.env['NODE_ENV'] || process.env['NODE_ENV'] === 'development'

export class BaseError extends Error {
  code: string

  constructor(message: string, code: string) {
    super(message)
    this.name = this.constructor.name
    this.code = code || 'internal-server-error'
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor)
    } else {
      this.stack = new Error(message).stack
    }
  }
}

export class EmptyParserOutputError extends BaseError {
  constructor() {
    super('Internal server error', 'empty-parse-output')
  }
}

export class EmptyHttpResponseError extends BaseError {
  constructor() {
    super('Empty response from feed', 'empty-http-response-output')
  }
}

export class InvalidInputError extends BaseError {
  constructor(message: string, code: string) {
    super(message, code || 'invalid-input')
  }
}

export class UpstreamHttpError extends BaseError {
  status: number
  statusText: string
  constructor(message: string, status: number) {
    super(message, 'upstream-http-error')
    this.status = status
    try {
      this.statusText = getReasonPhrase(status)
    } catch (error) {
      this.statusText = `Unknown error (${status})`
    }
  }
}
export class UpstreamEncryptionError extends BaseError {
  cause: Error
  constructor(error: Error) {
    super('Upstream encryption error', 'upstream-encryption-error')
    this.cause = error
  }
}

export class NotFoundError extends BaseError {
  constructor() {
    super('Could not find feed', 'could-not-find-feed')
  }
}

export class DnsLookupError extends BaseError {
  constructor() {
    super('Could not find domain', 'dns-lookup-error')
  }
}

export class ConnectionRefusedError extends BaseError {
  constructor() {
    super('The website refused the connection', 'connection-refused')
  }
}

export class TimeoutError extends BaseError {
  constructor() {
    super('The request for the feed timed out', 'timeout')
  }
}

export class UnknownRequestError extends BaseError {
  cause: Error
  constructor(cause: Error) {
    super('Unknown error while requesting feed', 'unknown-request-error')
    this.cause = cause
  }
}

export class ParserError extends BaseError {
  cause: Error
  parser: string
  constructor(cause: Error, parser: ParserKey) {
    super(cause.message, 'parser-error')
    this.cause = cause
    this.parser = parser
  }
}

export class NotAFeedError extends BaseError {
  cause?: Error
  constructor(cause?: Error) {
    super('Not a feed', 'not-a-feed')
    this.cause = cause
  }
}

export class ConnectionFailedError extends BaseError {
  url: string
  constructor(url: string) {
    super('Could not connect', 'connection-failed')
    this.url = url
  }
}

type ErrorResponse = {
  path: string
  stack?: string
  type?: string
  error: {
    message: string
    code?: string
    url?: string
    status?: string
    statusText?: string
    parser?: string
  }
}

export function createErrorFormatter(Sentry: any) {
  debug(Sentry ? 'creating error formatter with sentry' : 'creating error formatter without sentry')
  return function formatError(error: any) {
    const response: ErrorResponse = {
      path: error.path,
      error: {
        message: error.message,
        code: error.extensions.exception.code,
        url: error.extensions.exception.url,
        status: error.extensions.exception.status,
        statusText: error.extensions.exception.statusText,
        parser: error.extensions.exception.parser,
      },
    }
    if (error.stack) {
      if (development) {
        response.stack = error.extensions.exception.stack.split('\n')
      }
      try {
        response.type = error.extensions.exception.stack.split('\n')[0].split(':')[0]
      } catch (error) {
        if (development) {
          return error
        }
      }
    }

    debug.extend('formatError')('error response', response)

    if (Sentry) {
      Sentry.captureException(error.originalError || error, {
        extra: {
          path: error.path,
          apiResponse: response,
        },
      })
    }

    return response
  }
}

export const sentryIgnoreErrors = [
  'ConnectionFailedError',
  'ConnectionRefusedError',
  'DnsLookupError',
  'EmptyHttpResponseError',
  'EmptyParseOutputError',
  'InvalidInputError',
  'NotAFeedError',
  'NotFoundError',
  'ParserError',
  'TimeoutError',
  'UpstreamHttpError',
  'UpstreamEncryptionError',
  'ValidationError',
]
