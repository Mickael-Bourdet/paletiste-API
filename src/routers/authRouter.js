import { Router } from "express";
import { authController } from "../controllers/authController.js";
import { catchAsync } from "../middlewares/catchAsync.js";
import { validate } from "../middlewares/validationMiddleware.js";
import { registerSchema } from "../schemas/registerSchema.js";
import { checkEmailDomain } from "../middlewares/checkEmailDomain.js";
import { loginLimiter } from "../middlewares/rateLimiter.js";

export const authRouter = Router();

authRouter.post(
  "/register",
  loginLimiter,
  validate(registerSchema),
  checkEmailDomain,
  catchAsync(authController.register)
);
authRouter.post(
  "/login",
  loginLimiter,
  validate(loginSchema),
  checkEmailDomain,
  catchAsync(authController.login)
);
