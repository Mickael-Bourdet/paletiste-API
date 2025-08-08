export const eventRoutes = {
  "/events": {
    get: {
      summary: "List events",
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
                    price: { type: "integer" },
                    status: { type: "string" },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  "/events/{id}": {
    get: {
      summary: "Get event by id",
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
                  price: { type: "integer" },
                  status: { type: "string" },
                },
              },
            },
          },
        },
        400: { description: "Invalid id" },
        404: { description: "Event not found" },
      },
    },
  },
};
