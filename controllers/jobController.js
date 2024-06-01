import { NotFoundError } from "../errors/customError.js";
import Job from "../models/Job.js";
import { StatusCodes } from "http-status-codes";

export const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};

export const getJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.userId });
  res.status(StatusCodes.OK).json({ jobs, count: jobs.length });
};

export const getSingleJob = async (req, res) => {
  const { id: jobId } = req.params;
  const job = await Job.findOne({ _id: jobId });

  res.status(StatusCodes.OK).json({ job });
};

export const updateJob = async (req, res) => {
  const { id: jobId } = req.params;
  const reqBody = req.body;
  const job = await Job.findOneAndUpdate({ _id: jobId }, reqBody, {
    new: true,
    runValidators: true,
  });

  res.status(StatusCodes.OK).json({ job, msg: "Job Modified Successfully" });
};
export const deleteJob = async (req, res) => {
  const { id: jobId } = req.params;
  const job = await Job.findOneAndDelete({ _id: jobId });

  res.status(StatusCodes.OK).json({ msg: `Job Removed Successfully`, job });
};
