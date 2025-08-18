import rateLimit from "express-rate-limit";

// Limit each IP to 5 connexion requests per `window` (here, per 2 minutes).
export const loginLimiter = rateLimit({
  windowMs: 2 * 60 * 1000, // 2 minutes
  limit: 5,
  standardHeaders: "draft-8", // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  message: "Trop de tentatives de connexion, réessayez plus tard",
});
