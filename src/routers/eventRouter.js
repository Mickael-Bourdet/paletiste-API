import { Router } from "express";
import { eventController } from "../controllers/eventController.js";
// import { authMiddleware } from "../middlewares/authMiddleware.js";
import { validate } from "../middlewares/validationMiddleware.js";
import {
  createEventSchema,
  updateEventSchema,
} from "../middlewares/JoiValidationSchema/eventSchema.js";
import { uploadEventPoster } from "../middlewares/upload.js";

export const eventRouter = Router();

eventRouter.get("/events", eventController.getAllEvents);
eventRouter.get("/events/:id", eventController.getOneEvent);
eventRouter.post(
  "/events",
  // authMiddleware,
  uploadEventPoster.single("poster"),
  validate(createEventSchema),
  eventController.createEvent
);
eventRouter.patch(
  "/events/:id",
  // authMiddleware,
  uploadEventPoster.single("poster"),
  validate(updateEventSchema),
  eventController.updateEvent
);
eventRouter.delete(
  "/events/:id",
  // authMiddleware,
  uploadEventPoster.single("poster"),
  eventController.deleteEvent
);
