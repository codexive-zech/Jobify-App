import dotenv from "dotenv";
dotenv.config();
import Job from "./models/Job.js";
import User from "./models/User.js";
import { readFile } from "fs/promises";
import mongoose from "mongoose";

try {
  await mongoose.connect(process.env.MONGO_URL); // connect to the DB
  const user = await User.findOne({ email: "zech@gmail.com" }); // fetch the user with this specific email
  const jsonJob = JSON.parse(
    await readFile(new URL("./utils/mockData.json", import.meta.url))
  );
  const jobs = jsonJob.map((job) => {
    return { ...job, createdBy: user._id };
  });
  await Job.deleteMany({ createdBy: user._id });
  await Job.create(jobs);
  console.log("Success!");
  process.exit(0);
} catch (error) {
  console.log(error);
  process.exit(1);
}
