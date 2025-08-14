import { allRoutes } from "./routes/index.js";

export const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Paletiste API",
    version: "1.0.0",
    description: "Documentation de l'API Paletiste",
  },
  // components: {
  //   securitySchemes: {
  //     bearerAuth: {
  //       type: "http",
  //       scheme: "bearer",
  //       bearerFormat: "JWT",
  //     },
  //   },
  // },
  servers: [
    {
      url: `${process.env.BASE_URL}:${process.env.PORT}`,
      description: "API Server",
    },
  ],
  paths: { ...allRoutes },
};
