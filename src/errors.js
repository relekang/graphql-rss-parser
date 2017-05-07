const production = process.env.NODE_ENV === 'production'

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
  constructor(cause, statusCode) {
    super(cause.message, statusCode)
    this.cause = cause
  }
}

class NotAFeedError extends ParserError {
  constructor(cause, statusCode) {
    super(cause, statusCode || 400)
  }
}

function createErrorFormatter(Raven) {
  return function formatError(error) {
    if (Raven) {
      if (error.path || error.name !== 'GraphQLError') {
        Raven.captureException(
          error,
          raven.parsers.parseRequest(req, {
            tags: { graphql: 'error' },
            extra: {
              source: error.source && error.source.body,
              positions: error.positions,
              path: error.path
            }
          })
        )
      } else {
        Raven.captureMessage(
          `GraphQLWrongQuery: ${error.message}`,
          Raven.parsers.parseRequest(req, {
            tags: { graphql: 'query' },
            extra: {
              source: error.source && error.source.body,
              positions: error.positions
            }
          })
        )
      }
    }

    return {
      name: error.message,
      stack: production ? null : error.stack.split('\n')
    }
  }
}

module.exports = {
  EmptyHttpResponseError,
  EmptyParseOutputError,
  InvalidInputError,
  ParserError,
  NotAFeedError,
  NotFoundError,
  createErrorFormatter
}
