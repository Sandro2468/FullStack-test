class createError extends Error {
  constructor(message, statusCode, errors = []) {
    super(message)

    this.statusCode = statusCode
    this.status = `${statusCode}`.startsWith("4") ? "failed" : "error"
    this.errors = errors

    Error.captureStackTrace(this, this.constructor)
  }
}

module.exports = createError
