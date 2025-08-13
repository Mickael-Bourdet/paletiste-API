import { ApiError } from "../middlewares/ApiError.js";
import { Event } from "../models/associations.js";
import {
  formatDate,
  formatTime,
  formatPhoneNumber,
  slugifyWithComponents,
  generateEventTitle,
} from "../utils/eventFormatters.js";
import fs from "node:fs";

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
        where: { status: "pending" }, // only approved events
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
        ...event.toJSON(), // Every event fields
        // Create a title if empty string
        title:
          event.title ??
          generateEventTitle(event.category?.name, event.organizer, event.date),
        // create slug
        slug: slugifyWithComponents(
          event.category?.name ?? "", // Category name or empty string
          event.organizer, // Event organizer
          event.date // Event date
        ),
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

  /**
   * Get one event with its category, tags, and author.
   * Dates are formatted in French, and times are formatted without seconds.
   *
   * @async
   * @function getOneEvent
   * @param {import('express').Request} req - Express request (requires numeric params.id)
   * @param {import('express').Response} res - Express response
   * @param {Function} next - Next middleware for error handling
   * @returns {Promise<void>} 200 with the formatted event, 400 if invalid id, 404 if not found
   */
  async getOneEvent(req, res, next) {
    const eventId = Number.parseInt(req.params.id, 10);

    if (Number.isNaN(eventId)) {
      return next(new ApiError("Identifiant invalide", 400));
    }
    try {
      // Fetch one event, excluding category_id and user_id from the main event object
      const event = await Event.findByPk(eventId, {
        attributes: { exclude: ["category_id", "user_id"] },
        include: [
          {
            association: "category", // Include the event's category (id, name)
            attributes: ["id", "name"],
          },
          {
            association: "tags", // Include associated tags (id, name)
            attributes: ["id", "name"],
            through: { attributes: [] }, // Do not return the join table event_has_tag
          },
          {
            association: "author", // Include the event's author (id, pseudo)
            attributes: ["id", "pseudo"],
          },
        ],
      });

      if (!event || event.status !== "approved") {
        return next(new ApiError("Cet évènement n'existe pas", 404));
      }

      // Format event fields (date/times/phone) and compute the slug
      const formattedEvent = {
        ...event.toJSON(),
        // Create a title if empty string
        title:
          event.title ??
          generateEventTitle(event.category?.name, event.organizer, event.date),
        // create slug
        slug: slugifyWithComponents(
          event.category?.name ?? "", // Category name or empty string
          event.organizer, // Event organizer
          event.date // Event date
        ),
        date: formatDate(event.date), // Format date in French
        registration_time: formatTime(event.registration_time), // Format registration time
        start_time: formatTime(event.start_time), // Format start time
        reservation: formatPhoneNumber(event.reservation), // Format phone number
      };

      res.status(200).json(formattedEvent);
    } catch (error) {
      next(error);
    }
  },

  async createEvent(req, res, next) {
    // TODO : handle notif for modos
    try {
      const {
        title,
        organizer,
        location,
        date,
        description,
        registration_time,
        start_time,
        reservation,
        price,
        credit_card,
      } = req.body;

      if (!req.file) {
        return next(
          new ApiError("L'affiche de l'évènement est obligatoire", 400)
        );
      }

      const event = await Event.create({
        title,
        organizer,
        poster: `/uploads/events/${req.file.filename}`,
        location,
        date,
        description,
        registration_time,
        start_time,
        reservation,
        price,
        credit_card,
        status: "pending",
      });

      res.status(201).json(event);
    } catch (error) {
      // if server error, delete uploaded file
      if (req.file) {
        fs.unlink(req.file.path, (e) => {
          if (e) console.error("Erreur suppression fichier:", e);
        });
      }
      next(error);
    }
  },
};
