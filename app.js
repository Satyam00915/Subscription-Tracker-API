import express from "express";
import { PORT } from "./config/env.js";
import authRouter from "./Routes/auth.routes.js";
import userRouter from "./Routes/user.routes.js";
import subscriptionRouter from "./Routes/subscription.routes.js";
import connectToDatabase from "./DATABASE/mongodb.js";
import errorMiddleware from "./middleware/error.middleware.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/subscription", subscriptionRouter);

//Ensuring all the errors from route handler get caught
app.use(errorMiddleware);

app.listen(3000, async () => {
  console.log(`Listening on Server ${PORT}`);
  await connectToDatabase();
});

export default app;
