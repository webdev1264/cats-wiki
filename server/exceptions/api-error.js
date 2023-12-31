class ApiError extends Error {
  constructor(status, message, errors = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static Error(status, message) {
    return new ApiError(status, message);
  }

  static BadRequest(message) {
    return new ApiError(400, message);
  }
}

module.exports = ApiError;
