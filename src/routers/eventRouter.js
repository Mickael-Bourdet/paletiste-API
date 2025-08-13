import { Router } from "express";
import { eventController } from "../controllers/eventController.js";
// import { authMiddleware } from "../middlewares/authMiddleware.js";
import { validate } from "../middlewares/validationMiddleware.js";
import { createEventSchema } from "../middlewares/JoiValidationSchema/eventSchema.js";
import { uploadEventPoster } from "../middlewares/upload.js";

export const eventRouter = Router();

eventRouter.get("/events", eventController.getAllEvents);
eventRouter.get("/events/:id", eventController.getOneEvent);
eventRouter.post(
  "/events",
  // authMiddleware,
  uploadEventPoster.single("poster"),
  validate(createEventSchema),
  eventController.addEvent
);
