import { Router } from "express";
import { eventController } from "../controllers/eventController.js";
// import { authMiddleware } from "../middlewares/authMiddleware.js";
import { validate } from "../middlewares/validationMiddleware.js";
import { uploadEventPoster } from "../middlewares/upload.js";
import { catchAsync } from "../middlewares/catchAsync.js";
import {
  createEventSchema,
  updateEventSchema,
} from "../schemas/eventSchema.js";

export const eventRouter = Router();

eventRouter.get("/events", catchAsync(eventController.getAllEvents));
eventRouter.get(
  "/events/slug/:slug",
  catchAsync(eventController.getOneEventBySlug)
);
eventRouter.get(
  "/events/upcoming",
  catchAsync(eventController.getUpcomingEvents)
);
eventRouter.get("/events/major", catchAsync(eventController.getMajorEvent));
eventRouter.get(
  "/events/latest",
  catchAsync(eventController.getLatestAddedEvents)
);
eventRouter.get("/events/:id", catchAsync(eventController.getOneEvent));
eventRouter.post(
  "/events",
  // authMiddleware,
  uploadEventPoster.single("poster"),
  validate(createEventSchema),
  catchAsync(eventController.createEvent)
);
eventRouter.patch(
  "/events/:id",
  // authMiddleware,
  uploadEventPoster.single("poster"),
  validate(updateEventSchema),
  catchAsync(eventController.updateEvent)
);
eventRouter.delete(
  "/events/:id",
  // authMiddleware,
  uploadEventPoster.single("poster"),
  catchAsync(eventController.deleteEvent)
);
