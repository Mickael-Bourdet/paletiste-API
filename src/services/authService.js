import "dotenv/config";
import jwt from "jsonwebtoken";
import argon2 from "argon2";
import { v4 as uuidv4 } from "uuid";

/**
 * Generates a JWT token with the given payload.
 *
 * @param {Object} payload - The payload to include in the JWT token.
 * @returns {string} - The generated JWT token.
 */

export const generateAccessToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "15min" });
};

/**
 * Verifies a JWT token.
 *
 * @param {string} token - The JWT token to verify.
 * @returns {Object|null} - The decoded payload if the token is valid, null otherwise.
 */
export const verifyAccessToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    console.error("Erreur JWT :", error.message);
    return null;
  }
};

export const generateRefreshToken = (payload) => {
  const jti = uuidv4(); // unique ID for the refresh
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "30d" });
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
