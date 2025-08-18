import { Router } from "express";
import { authController } from "../controllers/authController.js";
import { catchAsync } from "../middlewares/catchAsync.js";
import { validate } from "../middlewares/validationMiddleware.js";
import { registerSchema } from "../schemas/registerSchema.js";
import { checkEmailDomain } from "../middlewares/checkEmailDomain.js";

export const authRouter = Router();

authRouter.post(
  "/register",
  validate(registerSchema),
  checkEmailDomain,
  catchAsync(authController.register)
);
