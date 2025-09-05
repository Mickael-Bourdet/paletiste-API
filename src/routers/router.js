import { Router } from "express";
import { eventRouter } from "./eventRouter.js";
import { authRouter } from "./authRouter.js";

// Main API Router
export const router = Router();

//Sub router
router.use(eventRouter);
router.use(authRouter);
