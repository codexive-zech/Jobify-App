import Job from "../models/Job.js";

export const createJob = async (req, res) => {
  const { position, company } = req.body;
  const job = await Job.create({ position, company });
  res.status(201).json({ job });
};

export const getJobs = async (req, res) => {
  const jobs = await Job.find({});
  res.status(200).json({ jobs, count: jobs.length });
};

export const getSingleJob = async (req, res) => {
  const { id: jobId } = req.params;
  const job = await Job.findOne({ _id: jobId });
  if (!job) {
    return res.status(400).json({ msg: `No Job With ID ${jobId}` });
  }
  res.status(200).json({ job });
};

export const updateJob = async (req, res) => {
  const { id: jobId } = req.params;
  const reqBody = req.body;
  const job = await Job.findOneAndUpdate({ _id: jobId }, reqBody, {
    new: true,
    runValidators: true,
  });
  if (!job) {
    return res.status(400).json({ msg: `No Job With ID ${jobId}` });
  }
  res.status(200).json({ job });
};
export const deleteJob = async (req, res) => {
  const { id: jobId } = req.params;
  const job = await Job.findOneAndDelete({ _id: jobId });
  if (!job) {
    return res.status(400).json({ msg: `No Job With ID ${jobId}` });
  }
  res.status(200).json({ msg: `Job Removed Successfully`, job });
};
