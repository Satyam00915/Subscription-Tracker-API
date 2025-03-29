import express from "express";
import { PORT } from "./config/env.js";
import authRouter from "./Routes/auth.routes.js";
import userRouter from "./Routes/user.routes.js";
import subscriptionRouter from "./Routes/subscription.routes.js";

const app = express();

app.use(express.json());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/subscription", subscriptionRouter);

app.get("/", (req, res) => {
  res.json({
    message: "Hello there",
  });
});

app.listen(3000, () => {
  console.log(`Listening on Server ${PORT}`);
});

export default app;
