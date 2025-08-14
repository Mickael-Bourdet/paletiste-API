/**
 * Custom error class for API errors.
 * Extends the built-in Error class to include additional properties for API-specific errors.
 */
export class ApiError extends Error {
  /**
   * Creates a new ApiError instance.
   *
   * @param {string} message - The error message.
   * @param {number} [statusCode=500] - The HTTP status code for the error (defaults to 500).
   * @param {any} [details=null] - Additional details about the error (defaults to null).
   */
  constructor(message, statusCode = 500, details = null) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
  }
}
