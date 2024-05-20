import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import morgan from "morgan";
import { nanoid } from "nanoid";
import connectDB from "./db/connectDB.js";

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
} // checking for dev mode in other to add morgan

app.use(express.json()); // parsing the data received from the browser

let jobs = [
  { id: nanoid(), company: "Facebook", position: "Frontend Developer" },
  { id: nanoid(), company: "Google", position: "Backend Developer" },
];

app.post("/", (req, res) => {
  const reqBody = req.body;
  res.status(200).json({ msg: "Data Received", data: reqBody });
});

app.get("/api/v1/jobs", (req, res) => {
  res.status(200).json({ jobs });
}); // Get all Jobs

app.use("*", (req, res) => {
  res.status(404).json({ msg: "Route Not Found" });
}); // Triggers when req made to a URL does not exist

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ msg: "Something Went Wrong" });
}); // Triggers and catches error occurring during request processing

const PORT = process.env.PORT || 5100; // stating PORT location

try {
  await connectDB(process.env.MONGO_URL);
  app.listen(PORT, () => {
    console.log("Server is up and DB is Connected");
  });
} catch (error) {
  console.log(error);
}
