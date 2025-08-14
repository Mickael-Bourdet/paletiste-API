import { Router } from "express";
import { authController } from "../controllers/authController.js";
import { catchAsync } from "../middlewares/catchAsync.js";
import { validate } from "../middlewares/validationMiddleware.js";
import { registerSchema } from "../middlewares/joiValidationSchema/registerSchema.js";

export const authRouter = Router();

authRouter.post(
  "/register",
  validate(registerSchema),
  catchAsync(authController.register)
);
