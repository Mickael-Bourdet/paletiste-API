import { Event } from "../models/associations.js";

export const eventController = {
  async getAllEvents(req, res, next) {
    try {
      const events = await Event.findAll({
        attributes: { exclude: ["category_id", "user_id"] }, //unnecessary fields
        include: [
          {
            association: "category",
            attributes: ["id", "name"],
          },
          {
            association: "tags",
            attributes: ["id", "name"],
            through: { attributes: [] }, // don't return event_has_tag
          },
          {
            association: "author",
            attributes: ["id", "pseudo"],
          },
        ],
      });
      res.status(200).json(events);
    } catch (error) {
      next(error);
    }
  },
};
