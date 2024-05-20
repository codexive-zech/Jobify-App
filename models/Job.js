import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
    },
    position: {
      type: String,
    },
    jobStatus: {
      type: String,
      enum: ["pending", "interview", "decline"],
      default: "pending",
    },
    jobType: {
      type: String,
      enum: ["full-time", "part-time", "internship"],
      default: "full-time",
    },
    jobLocation: {
      type: String,
      default: "My City",
    },
  },
  { timestamps: true }
);

const jobModel = mongoose.model("Job", jobSchema);

export default jobModel;
