export const healthRoutes = {
  "/": {
    get: {
      summary: "Health check",
      description: "Check if the API is running",
      responses: {
        200: { description: "API is running" },
      },
    },
  },
};
