import { ApiError } from "./ApiError.js";

/**
 * Middleware to handle errors.
 *
 * @param {Error} error - The error object.
 * @param {Object} _req - The request object (unused).
 * @param {Object} res - The response object.
 * @param {Function} _next - The next middleware function (unused).
 * @returns {Object} - The response object with the error details.
 */
export const errorHandler = (error, _req, res, _next) => {
  // Case 1: Custom application error (ApiError)
  if (error instanceof ApiError) {
    return res.status(error.statusCode).json({
      status: error.statusCode,
      message: error.message,
      errors: error.details ?? undefined, // Use error.details if it exists, otherwise set to undefined (the coalescence operator)
    });
  }

  // Case 2: Validation error (e.g., Joi)
  if (error.details && Array.isArray(error.details)) {
    return res.status(400).json({
      status: 400,
      message: "Erreur de validation",
      errors: error.details,
    });
  }

  // Case 3: Unexpected error
  const status = error.statusCode || 500;
  const message = error.message || "Une erreur est survenue";

  const response = {
    status,
    message,
  };

  // Include the error stack trace in the response if not in production environment
  if (process.env.NODE_ENV !== "production") {
    response.stack = error.stack;
  }

  return res.status(status).json(response);
};
