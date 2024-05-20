import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import morgan from "morgan";
import { nanoid } from "nanoid";

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

app.post("/api/v1/jobs", (req, res) => {
  const { company, position } = req.body;
  if (!company || !position) {
    return res.status(400).json({ msg: "Please Provide Company and Position" });
  }
  const id = nanoid(10);
  const job = { id, company, position };
  jobs.push(job);
  res.status(201).json({ job });
}); // Create a Job

app.get("/api/v1/jobs/:id", (req, res) => {
  const { id: jobId } = req.params;
  const singleJob = jobs.find((job) => job.id === jobId);
  if (!singleJob) {
    return res.status(400).json({ msg: "Job ID does not Exist" });
  }
  res.status(200).json({ singleJob });
}); // Get Single Job

app.patch("/api/v1/jobs/:id", (req, res) => {
  const { company, position } = req.body;
  if (!company || !position) {
    return res.status(400).json({ msg: "Please Provide Company and Position" });
  }

  const { id: jobId } = req.params;
  const singleJob = jobs.find((job) => job.id === jobId);

  singleJob.company = company;
  singleJob.position = position;
  res.status(200).json({ singleJob });
}); // Updating Job

app.delete("/api/v1/jobs/:id", (req, res) => {
  const { id: jobId } = req.params;
  const singleJob = jobs.find((job) => job.id === jobId);
  const newJobs = jobs.filter((job) => job.id !== jobId);
  jobs = newJobs;

  res.status(200).json({ msg: "Job Deleted Successfully" });
}); // Delete Job

app.use("*", (req, res) => {
  res.status(404).json({ msg: "Route Not Found" });
}); // Triggers when req made to a URL does not exist

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ msg: "Something Went Wrong" });
}); // Triggers and catches error occurring during request processing

const PORT = process.env.PORT || 5100; // stating PORT location

app.listen(PORT, () => {
  console.log("Server is up!");
});
