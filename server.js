import "express-async-errors";
import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import morgan from "morgan";
import connectDB from "./db/connectDB.js";
import jobRouter from "./routes/jobRoutes.js";
import errorHandlerMiddleware from "./middlewares/errorHandlerMiddleware.js";
import authRouter from "./routes/authRoutes.js";
import { authenticateUser } from "./middlewares/authMiddleware.js";
import cookieParser from "cookie-parser";

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
} // checking for dev mode in other to add morgan

app.use(express.json()); // parsing the data received from the browser
app.use(cookieParser());

app.use("/api/v1/auth", authRouter);

app.use("/api/v1/jobs", authenticateUser, jobRouter);

app.use("*", (req, res) => {
  res.status(404).json({ msg: "Route Not Found" });
}); // Triggers when req made to a URL does not exist

app.use(errorHandlerMiddleware); // Triggers and catches error occurring during asynchronous request processing

const PORT = process.env.PORT || 5100; // stating PORT location

try {
  await connectDB(process.env.MONGO_URL);
  app.listen(PORT, () => {
    console.log("Server is up and DB is Connected");
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
