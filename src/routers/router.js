import { Router } from "express";
import { eventRouter } from "./eventRouter.js";

// Main API Router
export const router = Router();

//Sub router
router.use(eventRouter);
