import "dotenv/config";
import express from "express";
import { xss } from "express-xss-sanitizer";
import cors from "cors";
import { router } from "./src/routers/router.js";
import { errorHandler } from "./src/middlewares/errorHandler.js";

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

// Middleware handling errors
app.use(errorHandler);

// Start app
app.listen(process.env.PORT, () => {
  console.log(
    `Listening on API running ${process.env.BASE_URL}:${process.env.PORT}`
  );
});
