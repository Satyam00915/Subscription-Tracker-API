import express from "express";
import { PORT } from "./config/env.js";
import authRouter from "./Routes/auth.routes.js";
import userRouter from "./Routes/user.routes.js";
import subscriptionRouter from "./Routes/subscription.routes.js";
import connectToDatabase from "./DATABASE/mongodb.js";

const app = express();

app.use(express.json());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/subscription", subscriptionRouter);


app.listen(3000, async () => {
  console.log(`Listening on Server ${PORT}`);
  await connectToDatabase();
});

export default app;
