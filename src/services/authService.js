import "dotenv/config";
import jwt from "jsonwebtoken";

/**
 * Generates a JWT token with the given payload.
 *
 * @param {Object} payload - The payload to include in the JWT token.
 * @returns {string} - The generated JWT token.
 */

export const generateJwtToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "15min" });
};
