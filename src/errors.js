const development = !process.env.NODE_ENV || process.env.NODE_ENV === 'development'

class BaseError extends Error {
  constructor(message, statusCode) {
    super(message)
    this.name = this.constructor.name
    this.statusCode = statusCode || 500
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor)
    } else {
      this.stack = new Error(message).stack
    }
  }
}

class EmptyParseOutputError extends BaseError {}

class EmptyHttpResponseError extends BaseError {}

class InvalidInputError extends BaseError {
  constructor(message, statusCode) {
    super(message, statusCode || 400)
  }
}

class NotFoundError extends BaseError {
  constructor(url) {
    super('Could not find feed', 404)
    this.url = url
  }
}

class ParserError extends BaseError {
  constructor(cause, parser, statusCode) {
    super(cause.message, statusCode)
    this.cause = cause
    this.parser = parser
  }
}

class NotAFeedError extends ParserError {
  constructor(cause, statusCode) {
    super(cause, statusCode || 400)
  }
}

class ConnectionFailedError extends ParserError {
  constructor(url) {
    super('Could not connect', 404)
    this.url = url
  }
}

function createErrorFormatter(Raven) {
  return function formatError(error) {
    if (Raven) {
      if (error.path || error.name !== 'GraphQLError') {
        Raven.captureException(error, {
          tags: { graphql: 'error' },
          extra: {
            source: error.source && error.source.body,
            positions: error.positions,
            path: error.path,
          },
        })
      } else {
        Raven.captureMessage(`GraphQLWrongQuery: ${error.message}`, {
          tags: { graphql: 'query' },
          extra: {
            source: error.source && error.source.body,
            positions: error.positions,
          },
        })
      }
    }

    return {
      message: error.message,
      stack: development ? error.stack.split('\n') : null,
    }
  }
}

module.exports = {
  ConnectionFailedError,
  EmptyHttpResponseError,
  EmptyParseOutputError,
  InvalidInputError,
  ParserError,
  NotAFeedError,
  NotFoundError,
  createErrorFormatter,
}
