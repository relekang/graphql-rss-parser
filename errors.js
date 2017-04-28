class BaseError extends Error {
  constructor (message) {
    super(message)
    this.name = this.constructor.name
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor)
    } else {
      this.stack = (new Error(message)).stack
    }
  }
}

class EmptyParseOutputError extends BaseError {}

class EmptyHttpResponseError extends BaseError {}

module.exports = {
  EmptyHttpResponseError,
  EmptyParseOutputError
}