class BaseError extends Error {
  constructor (message, statusCode) {
    super(message)
    this.name = this.constructor.name
    this.statusCode = statusCode || 500
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor)
    } else {
      this.stack = (new Error(message)).stack
    }
  }
}

class EmptyParseOutputError extends BaseError { }

class EmptyHttpResponseError extends BaseError { }

class ParserError extends BaseError {
  constructor (cause, statusCode) {
    super(cause.message, statusCode)
    this.cause = cause
  }
}

class NotAFeedError extends ParserError {
  constructor (cause, statusCode) {
    super(cause, statusCode || 400)
  }
}

module.exports = {
  EmptyHttpResponseError,
  EmptyParseOutputError,
  ParserError,
  NotAFeedError
}
