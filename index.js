import express from "express";

// Run app
const app = express();

app.use(express.json());

// Start app
app.listen(process.env.PORT, () => {
  console.log(`Listening on API running ${process.env.BASE_URL}:${process.env.PORT}`);
});
