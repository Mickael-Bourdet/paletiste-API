import { User } from "../models/User.js";
import { ApiError } from "../middlewares/ApiError.js";

export const authController = {
  /**
   * Controller method to register a new user.
   *
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @param {Function} next - The next middleware function.
   * @returns {Object} - The response object with the registration status and user data.
   */
  async register(req, res, next) {
    // const pseudo = req.body.trim();
    const email = req.body.trim();
    // const password = req.body.trim();

    // Check if the email is already in use
    const existingEmail = await User.findOne({ where: { email } });
    if (existingEmail) {
      return next(new ApiError("E-mail déjà utilisé", 409));
    }
  },
};
