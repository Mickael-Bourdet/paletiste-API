import "dotenv/config";
import { verifyJwtToken } from "../services/authService.js";

/**
 * Middleware to authenticate requests using JWT.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */

export const authMiddleware = (req, res, next) => {
  try {
    // Retrieve the Authorization header from the request
    const authHeader = req.headers.authorization;
    // Check if the Authorization header is missing or does not start with "Bearer "
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ error: true, message: "Token manquant ou invalide" });
    }
    // Extract the raw token from the Authorization header
    const token = authHeader.split(" ")[1];

    // Verify the token using the JWT secret key
    const decodedToken = verifyJwtToken(token);
    if (!decodedToken || !decodedToken.userId) {
      return res.status(401).json({ error: true, message: "Token invalide" });
    }

    // Attach the decoded user information to the request object
    req.user = decodedToken;

    next();
  } catch (error) {
    return res.status(401).json({ error: true, message: "Accès non autorisé" });
  }
};
