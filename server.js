import "express-async-errors";
import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import morgan from "morgan";
import connectDB from "./db/connectDB.js";
import jobRouter from "./routes/jobRoutes.js";
import errorHandlerMiddleware from "./middlewares/errorHandlerMiddleware.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import { authenticateUser } from "./middlewares/authMiddleware.js";
import cookieParser from "cookie-parser";
import notFoundMiddleware from "./middlewares/notFoundMiddleware.js";
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";
import cloudinary from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
}); // configuration setting for cloudinary to enable Media Upload

const app = express();

const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.resolve(__dirname, "./public"))); // render all file in the public folder statically

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
} // checking for dev mode in other to add morgan

app.use(express.json()); // parsing the data received from the browser
app.use(cookieParser());

app.use("/api/v1/auth", authRouter);

app.use("/api/v1/jobs", authenticateUser, jobRouter);

app.use("/api/v1/users", authenticateUser, userRouter);

app.get("/api/v1/test", (req, res) => {
  res.json({ msg: "test route" });
});

app.use("*", notFoundMiddleware); // Triggers when req made to a URL does not exist

app.use(errorHandlerMiddleware); // Triggers and catches error occurring during asynchronous request processing (during data processing)

const PORT = process.env.PORT || 5100; // stating PORT location

try {
  await connectDB(process.env.MONGO_URL);
  app.listen(PORT, () => {
    console.log("Server is up and DB is Connected");
  });
} catch (error) {
  process.exit(1);
}
