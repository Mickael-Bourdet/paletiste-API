// TODO : add authentication doc
// TODO : security bearer
export const eventRoutes = {
  "/events": {
    get: {
      tags: ["Event"],
      summary: "Get all events",
      description: "Get all events with their category, tags, and author",
      responses: {
        200: {
          description: "Array of events",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    id: { type: "integer" },
                    title: { type: "string" },
                    slug: { type: "string" },
                    organizer: { type: "string" },
                    location: { type: "string" },
                    date: { type: "string" },
                    description: { type: "string" },
                    registration_time: { type: "string" },
                    start_time: { type: "string" },
                    reservation: { type: "string" },
                    price: { type: "integer" },
                    status: { type: "string" },
                  },
                },
              },
            },
          },
        },
        500: { description: "Internal server error" },
      },
    },
    post: {
      tags: ["Event"],
      summary: "Create an event",
      description:
        "Create a new event. The 'status' is automatically set to 'pending'. Poster file upload is supported.",
      requestBody: {
        required: true,
        content: {
          "multipart/form-data": {
            schema: {
              type: "object",
              properties: {
                title: {
                  type: "string",
                  example: "Concours fonte du palet amical Froidfondais",
                },
                organizer: {
                  type: "string",
                  example: "Palet Amical Froidfondais",
                },
                location: {
                  type: "string",
                  example: "Salle Pierrefite-Nestalas",
                },
                date: { type: "string", format: "date", example: "2026-04-24" },
                description: {
                  type: "string",
                  example:
                    "Concours organisé par le paf, climatisation dans la salle et pas de TPE",
                },
                registration_time: { type: "string", example: "14:00" },
                start_time: { type: "string", example: "14:30" },
                reservation: {
                  type: "string",
                  example: "Contactez Michel au 06 00 00 00 01",
                },
                price: { type: "integer", example: 10 },
                credit_card: { type: "boolean", example: false },
                poster: { type: "string", format: "binary" },
              },
              required: [
                "organizer",
                "location",
                "date",
                "start_time",
                "reservation",
                "price",
                "poster",
              ],
            },
          },
        },
      },
      responses: {
        201: {
          description: "Event created successfully",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    title: { type: "string" },
                    organizer: { type: "string" },
                    location: { type: "string" },
                    date: { type: "string", format: "date" },
                    description: { type: "string" },
                    registration_time: { type: "string", example: "14:00" },
                    start_time: { type: "string", example: "14:30" },
                    reservation: { type: "string" },
                    price: { type: "integer" },
                    credit_card: { type: "boolean" },
                    poster: { type: "string", format: "binary" },
                  },
                },
              },
            },
          },
        },
      },
      400: { description: "Validation error" },
      401: { description: "Unauthorized - authentication required" },
      500: { description: "Internal server error" },
    },
  },
  "/events/{id}": {
    get: {
      tags: ["Event"],
      summary: "Get a specific event",
      description: "Get a single event by its identifier",
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: { type: "integer" },
          description: "Event ID",
        },
      ],
      responses: {
        200: {
          description: "Event found",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  id: { type: "integer" },
                  title: { type: "string" },
                  slug: { type: "string" },
                  organizer: { type: "string" },
                  location: { type: "string" },
                  date: { type: "string" },
                  description: { type: "string" },
                  registration_time: { type: "string" },
                  start_time: { type: "string" },
                  reservation: { type: "string" },
                  price: { type: "integer" },
                  status: { type: "string" },
                },
              },
            },
          },
        },
        400: { description: "Invalid id" },
        404: { description: "Event not found" },
        500: { description: "Internal server error" },
      },
    },
    patch: {
      tags: ["Event"],
      summary: "Update an event",
      description: "Get a single event by its identifier",
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: { type: "integer" },
          description: "Event ID",
        },
      ],
      requestBody: {
        required: true,
        content: {
          "multipart/form-data": {
            schema: {
              type: "object",
              properties: {
                title: {
                  type: "string",
                  example: "Concours fonte du palet amical Froidfondais",
                },
                organizer: {
                  type: "string",
                  example: "Palet Amical Froidfondais",
                },
                location: {
                  type: "string",
                  example: "Salle Pierrefite-Nestalas",
                },
                date: { type: "string", format: "date", example: "2026-04-24" },
                description: {
                  type: "string",
                  example:
                    "Concours organisé par le paf, climatisation dans la salle et pas de TPE",
                },
                registration_time: { type: "string", example: "14:00" },
                start_time: { type: "string", example: "14:30" },
                reservation: {
                  type: "string",
                  example: "Contactez Michel au 06 00 00 00 01",
                },
                price: { type: "integer", example: 10 },
                credit_card: { type: "boolean", example: false },
                poster: { type: "string", format: "binary" },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Event updated successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  id: { type: "integer" },
                  title: { type: "string" },
                  slug: { type: "string" },
                  organizer: { type: "string" },
                  location: { type: "string" },
                  date: { type: "string" },
                  price: { type: "integer" },
                  status: { type: "string" },
                },
              },
            },
          },
          400: { description: "Invalid id" },
          401: { description: "Unauthorized - authentication required" },
          404: { description: "Event not found" },
          500: { description: "Internal server error" },
        },
      },
    },
    delete: {
      tags: ["Event"],
      summary: "Delete an event",
      description: "Delete a single event by its identifier",
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: { type: "integer" },
          description: "Event ID",
        },
      ],
      responses: {
        200: {
          description: "Event deleted successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "Event deleted successfully",
                  },
                },
              },
            },
          },
          400: { description: "Invalid id" },
          401: { description: "Unauthorized - authentication required" },
          404: { description: "Event not found" },
          500: { description: "Internal server error" },
        },
      },
    },
  },
};
