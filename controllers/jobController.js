import { NotFoundError } from "../errors/customError.js";
import Job from "../models/Job.js";
import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";
import day from "dayjs";

export const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};

export const getJobs = async (req, res) => {
  const {
    search,
    jobStatus,
    jobType,
    sort,
    page: jobPage,
    limit: jobLimit,
  } = req.query;

  const queryObj = {
    createdBy: req.user.userId,
  };

  if (search) {
    queryObj.$or = [
      { position: { $regex: search, $options: "i" } },
      { company: { $regex: search, $options: "i" } },
    ];
  }

  if (jobStatus && jobStatus !== "all") {
    queryObj.jobStatus = jobStatus;
  }

  if (jobType && jobType !== "all") {
    queryObj.jobType = jobType;
  }

  const sortOptions = {
    newest: "-createdAt",
    oldest: "createdAt",
    "a-z": "position",
    "z-a": "-position",
  };

  const sortKey = sortOptions[sort] || sortOptions.newest;

  const page = Number(jobPage) || 1; // page
  const limit = Number(jobLimit) || 10; // limit
  const skip = (page - 1) * limit; // how many jobs is needed to be skipped when moving to another page

  const jobs = await Job.find(queryObj).sort(sortKey).limit(limit).skip(skip);

  const totalJobs = await Job.countDocuments(queryObj);
  const numbOfPage = Math.ceil(totalJobs / limit);
  res.status(StatusCodes.OK).json({
    jobs,
    count: jobs.length,
    totalJobs,
    numbOfPage,
    currentPage: page,
  });
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

export const showJobStats = async (req, res) => {
  let jobCountStats = await Job.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } }, // match all jobs belonging to a single user if they created it.
    { $group: { _id: "$jobStatus", count: { $sum: 1 } } }, // grouping all jobs to their various job status and counting job each based on their status
  ]);

  jobCountStats = jobCountStats.reduce((total, curr) => {
    const { _id: title, count } = curr;
    total[title] = count;
    return total;
  }, {});

  const defaultStat = {
    pending: jobCountStats.pending || 0,
    interview: jobCountStats.interview || 0,
    decline: jobCountStats.decline || 0,
  };
  let monthlyJobApp = await Job.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } }, // match all jobs belonging to a single user if they created it.
    {
      $group: {
        _id: {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
        },
        count: { $sum: 1 },
      },
    }, // grouping all jobs based on the month and year they were created and counting them all
    { $sort: { "_id.year": -1, "_id.month": -1 } },
    { $limit: 6 },
  ]);

  monthlyJobApp = monthlyJobApp
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;
      const date = day()
        .month(month - 1)
        .year(year)
        .format("MMM YY");
      return { date, count };
    })
    .reverse();
  res.status(StatusCodes.OK).json({ defaultStat, monthlyJobApp });
};
