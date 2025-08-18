import "dotenv/config";
import jwt from "jsonwebtoken";
import argon2 from "argon2";

/**
 * Generates a JWT token with the given payload.
 *
 * @param {Object} payload - The payload to include in the JWT token.
 * @returns {string} - The generated JWT token.
 */

export const generateJwtToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "15min" });
};

/**
 * Verifies a JWT token.
 *
 * @param {string} token - The JWT token to verify.
 * @returns {Object|null} - The decoded payload if the token is valid, null otherwise.
 */
export const verifyJwtToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    console.error("Erreur JWT :", error.message);
    return null;
  }
};

/**
 * Hashes a plain text password using Argon2.
 *
 * @param {string} password - The plain text password to hash.
 * @returns {Promise<string>} - The hashed password.
 */
export const hashPassword = async (password) => {
  return await argon2.hash(password);
};
