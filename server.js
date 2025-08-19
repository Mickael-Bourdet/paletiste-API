import "dotenv/config";
import path from "path";
import express from "express";
import { xss } from "express-xss-sanitizer";
import cors from "cors";
import { router } from "./src/routers/router.js";
import { errorHandler } from "./src/middlewares/errorHandler.js";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { swaggerDefinition } from "./src/docs/swagger.js";
import rateLimit from "express-rate-limit";

// Run app
const app = express();
app.use(express.json());

// add folder to get posters
app.use(express.static(path.join(process.cwd(), "uploads/seeding")));

// Limits number of request per user
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: "draft-8", // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  message: "Trop de requêtes effectuées, réessayez plus tard",
});

// Apply the rate limiting middleware to all requests.
app.use(limiter);

// Define corsOptions
const allowedDomains = [
  "http://localhost:3000", // front dev
  "https://www.paletiste.com", // front prod
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedDomains.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PATCH", "DELETE"], // Limits authorized
  allowedHeaders: ["Content-Type", "Authorization"], // Limits headers
};
app.use(cors(corsOptions));

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
