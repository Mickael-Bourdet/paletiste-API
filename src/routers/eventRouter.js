import { Router } from "express";
import { eventController } from "../controllers/eventController.js";

export const eventRouter = Router();

eventRouter.get("/events", eventController.getAllEvents);
