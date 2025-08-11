import { Router } from "express";
import { eventController } from "../controllers/eventController.js";

export const eventRouter = Router();

eventRouter.get("/events", eventController.getAllEvents);
eventRouter.get("/events/:id", eventController.getOneEvent);
eventRouter.post(
  "/events",
  authMiddleware,
  validate(createEventSchema),
  eventController.addEvent
);
