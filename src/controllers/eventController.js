import { Event } from "../models/associations.js";
import {
  formatDate,
  formatTime,
  formatPhoneNumber,
} from "../utils/formatters.js";

export const eventController = {
  /**
   * Get all events with their category, tags, and author.
   * Dates are formatted in French, and times are formatted without seconds.
   *
   * @async
   * @function getAllEvents
   * @param {import('express').Request} req - Express request object
   * @param {import('express').Response} res - Express response object
   * @param {Function} next - Express next middleware function
   * @returns {Promise<void>} Sends a JSON response with the list of events
   */
  async getAllEvents(req, res, next) {
    try {
      // Fetch all events, excluding category_id and user_id from the main event object
      const events = await Event.findAll({
        attributes: { exclude: ["category_id", "user_id"] },
        include: [
          {
            association: "category", // Include the event's category (id, name)
            attributes: ["id", "name"],
          },
          {
            association: "tags", // Include associated tags (id, name)
            attributes: ["id", "name"],
            through: { attributes: [] }, // Don't return event_has_tag join table
          },
          {
            association: "author", // Include the event's author (id, name)
            attributes: ["id", "pseudo"],
          },
        ],
      });

      // Format each event's date and times for the response
      const formattedEvents = events.map((event) => ({
        ...event.toJSON(),
        date: formatDate(event.date), // Format date in French
        registration_time: formatTime(event.registration_time), // Format registration time
        start_time: formatTime(event.start_time), // Format start time
        reservation: formatPhoneNumber(event.reservation), // Format phone number
      }));

      res.status(200).json(formattedEvents);
    } catch (error) {
      next(error);
    }
  },
};
