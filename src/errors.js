const { getReasonPhrase } = require('http-status-codes')
const debug = require('debug')('graphql-rss-parser:errors')
const development = !process.env.NODE_ENV || process.env.NODE_ENV === 'development'

class BaseError extends Error {
  constructor(message, code) {
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

class EmptyParseOutputError extends BaseError {
  constructor() {
    super('Internal server error', 'empty-parse-output')
  }
}

class EmptyHttpResponseError extends BaseError {
  constructor() {
    super('Empty response from feed', 'empty-http-response-output')
  }
}

class InvalidInputError extends BaseError {
  constructor(message, code) {
    super(message, code || 'invalid-input')
  }
}

class UpstreamHttpError extends BaseError {
  constructor(message, status) {
    super(message, 'upstream-http-error')
    this.status = status
    try {
      this.statusText = getReasonPhrase(status)
    } catch (error) {
      this.statusText = `Unknown error (${status})`
    }
  }
}

class NotFoundError extends BaseError {
  constructor() {
    super('Could not find feed', 'could-not-find-feed')
  }
}

class DnsLookupError extends BaseError {
  constructor() {
    super('Could not find domain', 'dns-lookup-error')
  }
}

class ConnectionRefusedError extends BaseError {
  constructor() {
    super('The website refused the connection', 'connection-refused')
  }
}

class TimeoutError extends BaseError {
  constructor() {
    super('The request for the feed timed out', 'timeout')
  }
}

class UnknownRequestError extends BaseError {
  constructor(cause) {
    super('Unknown error while requesting feed', 'unknown-request-error')
    this.cause = cause
  }
}

class ParserError extends BaseError {
  constructor(cause, parser) {
    super(cause.message, 'parser-error')
    this.cause = cause
    this.parser = parser
  }
}

class NotAFeedError extends BaseError {
  constructor() {
    super('Not a feed', 'not-a-feed')
  }
}

class ConnectionFailedError extends BaseError {
  constructor(url) {
    super('Could not connect', 'connection-failed')
    this.url = url
  }
}

function createErrorFormatter(Sentry) {
  debug(Sentry ? 'creating error formatter with sentry' : 'creating error formatter without sentry')
  return function formatError(error) {
    const response = {
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

module.exports = {
  ConnectionFailedError,
  ConnectionRefusedError,
  createErrorFormatter,
  DnsLookupError,
  EmptyHttpResponseError,
  EmptyParseOutputError,
  InvalidInputError,
  NotAFeedError,
  NotFoundError,
  ParserError,
  TimeoutError,
  UnknownRequestError,
  UpstreamHttpError,
  sentryIgnoreErrors: [
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
    'ValidationError',
  ],
}
