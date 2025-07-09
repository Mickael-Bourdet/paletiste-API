import "dotenv/config";
import express from "express";
import { xss } from "express-xss-sanitizer";
import cors from "cors";

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

// Start app
app.listen(process.env.PORT, () => {
  console.log(`Listening on API running ${process.env.BASE_URL}:${process.env.PORT}`);
});
