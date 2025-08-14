import fs from "node:fs";
/**
 * Middleware function to validate request body against a schema.
 *
 * @param {Object} schema - The validation schema.
 * @returns {Function} - The middleware function.
 */

export const validate = (schema) => {
  // Return the middleware function
  return (req, _res, next) => {
    // Validate the request body against the schema
    const { error } = schema.validate(req.body, {
      abortEarly: false,
      allowUnknown: true, // put "poster" in req.body without error and only multer handle "poster"
    });

    // Check if there is a validation error
    if (error) {
      if (req.file) {
        fs.unlink(req.file.path, () => {}); // delete poster upload file if not valid
      }
      // Extract error messages from the validation error details
      const errorMessage = error.details.map((detail) => detail.message);

      // create a new error object
      const validationError = new Error("Erreur de validation");
      validationError.statusCode = 400; // Set the status code to 400 (Bad Request)
      validationError.details = errorMessage; // Attach the error messages to the error object

      // Pass the validation error to the next middleware
      return next(validationError);
    }
    // If there is no validation error, proceed to the next middleware
    next();
  };
};
