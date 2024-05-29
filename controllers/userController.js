import { StatusCodes } from "http-status-codes";
import User from "../models/User.js";
import Job from "../models/Job.js";

export const getCurrentUser = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId });
  const getUserExcludePassword = user.excludePassword();
  res.status(StatusCodes.OK).json({ user: getUserExcludePassword });
};

export const getAppStats = async (req, res) => {
  const user = await User.countDocuments();
  const job = await Job.countDocuments();
  res.status(StatusCodes.OK).json({ user, job });
};

export const updateUser = async (req, res) => {
  const userObj = { ...req.body };
  delete userObj.password;
  const user = await User.findByIdAndUpdate(req.user.userId, userObj);
  res.status(StatusCodes.OK).json({ msg: "Update User" });
};
