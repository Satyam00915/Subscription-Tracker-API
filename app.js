import express from "express";
import { PORT } from "./config/env.js";

const app = express();

app.get("/", (req, res) => {
  res.json({
    message: "Hello there",
  });
});

app.listen(3000, () => {
  console.log(`Listening on Server ${PORT}`);
});

export default app;
