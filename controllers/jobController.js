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
  } = req.query; //retrieving data from the Query Params

  const queryObj = {
    createdBy: req.user.userId,
  };

  if (search) {
    queryObj.$or = [
      { position: { $regex: search, $options: "i" } },
      { company: { $regex: search, $options: "i" } },
    ];
  } // perform app search via the value of position and company in the DB add to the query object only if the search params is added to the search query

  if (jobStatus && jobStatus !== "all") {
    queryObj.jobStatus = jobStatus;
  } // perform app job status filtering based on the value in query object on if the jobStatus key is available in the search params

  if (jobType && jobType !== "all") {
    queryObj.jobType = jobType;
  } // perform app job status filtering based on the value in query object on if the jobStatus key is available in the search params

  const sortOptions = {
    newest: "-createdAt", // arrange createdAt field in descending order
    oldest: "createdAt", // arrange createdAt field in ascending order
    "a-z": "position", // arrange position field in ascending order
    "z-a": "-position", // arrange position field in descending order
  };

  const sortKey = sortOptions[sort] || sortOptions.newest; // set a new sort key value based on the options

  const page = Number(jobPage) || 1; // page
  const limit = Number(jobLimit) || 10; // limit
  const skip = (page - 1) * limit; // how many jobs is needed to be skipped when moving to another page

  const jobs = await Job.find(queryObj).sort(sortKey).limit(limit).skip(skip); // finding the list of jobs available in the Job collection

  const totalJobs = await Job.countDocuments(queryObj); // counting the total number of document (job) available in collection
  const numbOfPage = Math.ceil(totalJobs / limit); // breaking down the number of pages need to display the jobs
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
    {
      $match: {
        createdBy: new mongoose.Types.ObjectId(req.user.userId), // converts req.user.userId into an ObjectId which is mongoose Ids format
      },
    }, // filtering the jobs so that only the ones created by the user specified in req.user.userId are passed to the next stage.
    {
      $group: {
        _id: "$jobStatus",
        count: { $sum: 1 }, // calculates the count of job status by adding 1 for each job
      },
    }, // grouping all jobs to their respective status and counting job each based on their status
  ]); // performing an aggregation operation on the Job collection available in MongoDB

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
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } }, // filtering the jobs to only those created by the user identified by req.user.userId.
    {
      $group: {
        _id: {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
        },
        count: { $sum: 1 }, // calculates the count of job based on the year and month by adding 1 for each.
      },
    }, // grouping all the jobs available based on the year and month when they were created
    { $sort: { "_id.year": -1, "_id.month": -1 } }, // sorting the grouped year and month in descending order, it will starts from the most recent year and month.
    { $limit: 6 }, // limiting the output to the top 6 groups, after sorting. This is effectively getting the job count for the last 6 months
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
