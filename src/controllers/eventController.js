import { Event } from "../models/associations.js";

export const eventController = {
  async getAllEvents(req, res, next) {
    try {
      const events = await Event.findAll();
      res.status(200).json(events);
    } catch (error) {
      next(error);
    }
  },
};
