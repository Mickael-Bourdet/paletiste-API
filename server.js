import "dotenv/config";
import express from "express";
import { xss } from "express-xss-sanitizer";
import cors from "cors";
import { router } from "./src/routers/router.js";
import { errorHandler } from "./src/middlewares/errorHandler.js";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { swaggerDefinition } from "./src/docs/swagger.js";

// Run app
const app = express();

app.use(express.json());
app.use(cors());

// Prevent XSS attacks
app.use(xss());

// route to show that API is running
app.get("/", (req, res) => {
  res.status(200).send("API is running");
});

app.use(router);

// Swagger UI
const swaggerSpec = swaggerJsdoc({ definition: swaggerDefinition, apis: [] });
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Middleware handling errors
app.use(errorHandler);

// Start app
app.listen(process.env.PORT, () => {
  console.log(
    `Listening on API running ${process.env.BASE_URL}:${process.env.PORT}`
  );
});
