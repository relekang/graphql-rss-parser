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

class NotAFeedError extends BaseError {
  constructor() {
    super('Not a feed', 400)
  }
}

class ConnectionFailedError extends BaseError {
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

    const response = {
      message: error.message,
    }
    if (error.stack) {
      if (development) {
        response.stack = error.stack.split('\n')
      }
      try {
        response.type = error.stack.split('\n')[0].split(':')[0]
      } catch (error) {
        if (development) {
          return error
        }
      }
    }
    return response
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
