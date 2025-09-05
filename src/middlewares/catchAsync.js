import fs from "fs";

/**
 * Wraps an async controller to catch errors and pass them to the error handler.
 * If a file was uploaded during the request, it will be deleted in case of an error.
 *
 * @param {Function} controller - The async controller function to wrap (req, res, next)
 * @returns {Function} A new function that executes the controller and handles errors
 */
export const catchAsync = (controller) => async (req, res, next) => {
  try {
    await controller(req, res, next);
  } catch (error) {
    // If a single file was uploaded, remove it on error
    if (req.file) {
      fs.unlink(req.file.path, (e) => {
        if (e) console.error("Erreur suppression fichier:", e);
      });
    }
    next(error); // Pass the error to the centralized error handler
  }
};
