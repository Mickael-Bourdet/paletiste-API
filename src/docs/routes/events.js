// TODO : add authentication doc
// TODO : security bearer
export const eventRoutes = {
  "/events": {
    get: {
      tags: ["Event"],
      summary: "Get all events",
      description: "Get all events with their category, tags, and author",
      parameters: [
        {
          in: "query",
          name: "department",
          schema: { type: "string", example: "85" },
          description: "Filtre par département (préfixe du code postal)",
        },
        {
          in: "query",
          name: "teamType",
          schema: {
            type: "string",
            enum: ["individuel", "doublette", "triplette"],
          },
          description: "Filtre par type d'équipe",
        },
        {
          in: "query",
          name: "eventType",
          schema: {
            type: "string",
            enum: ["concours", "open", "femme", "CDF", "jeunes", "seniors"],
          },
          description: "Filtre par type d'évènement",
        },
        {
          in: "query",
          name: "organizerType",
          schema: {
            type: "string",
            enum: ["club", "association", "federation"],
          },
          description: "Filtre par type d'organisateur",
        },
        {
          in: "query",
          name: "category",
          schema: { type: "string", example: "Fonte" },
          description: "Filtre par catégorie (nom exact)",
        },
        {
          in: "query",
          name: "specificDate",
          schema: { type: "string", example: "13 septembre 2025" },
          description:
            "Filtre par date précise (ISO, jj/mm/aaaa, jj-mm-aaaa, ou date FR comme '13 septembre 2025')",
        },
        {
          in: "query",
          name: "monthYear",
          schema: { type: "string", example: "2025-09" },
          description:
            "Filtre par mois/année (ex: 'janvier 2026', '2026-01', '01-2026'). Ignoré si specificDate présent.",
        },
        {
          in: "query",
          name: "month",
          schema: { type: "string", example: "janvier" },
          description:
            "Alternative à monthYear: mois (fr ou 1-12) combiné avec 'year' (ex: month=janvier&year=2026)",
        },
        {
          in: "query",
          name: "year",
          schema: { type: "integer", example: 2026 },
          description: "Année lorsqu'utilisé avec 'month'",
        },
        {
          in: "query",
          name: "location",
          schema: { type: "string", example: "La Ferriere" },
          description:
            "Filtre par ville (recherche contient, insensible aux accents et à la casse)",
        },
      ],
      responses: {
        200: {
          description: "Array of events or empty result object",
          content: {
            "application/json": {
              schema: {
                oneOf: [
                  {
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
                  {
                    type: "object",
                    properties: {
                      message: {
                        type: "string",
                        example: "Aucun événement trouvé pour ce filtre",
                      },
                      events: {
                        type: "array",
                        items: { type: "object" },
                        example: [],
                      },
                    },
                  },
                ],
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
  "/events/slug/{slug}": {
    get: {
      tags: ["Event"],
      summary: "Get an event by slug",
      description: "Get a single approved event by its computed slug",
      parameters: [
        {
          in: "path",
          name: "slug",
          required: true,
          schema: { type: "string" },
          description: "Computed slug of the event",
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
        404: { description: "Event not found" },
        500: { description: "Internal server error" },
      },
    },
  },
  "/events/upcoming": {
    get: {
      tags: ["Event"],
      summary: "Get next upcoming events",
      description:
        "Get up to 4 approved events with the closest dates in the future",
      responses: {
        200: {
          description: "Array of upcoming events",
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
  },
  "/events/major": {
    get: {
      tags: ["Event"],
      summary: "Get next major events",
      description:
        "Get up to 2 approved major events (CDF, open, femme, jeunes) in the future",
      responses: {
        200: {
          description: "Array of major events",
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
  },
};
