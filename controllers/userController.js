import { StatusCodes } from "http-status-codes";
import User from "../models/User.js";
import Job from "../models/Job.js";

export const getCurrentUser = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId });
  const getUserExcludePassword = user.excludePassword();
  res.status(StatusCodes.OK).json({ user: getUserExcludePassword });
};

export const getAppStats = async (req, res) => {
  const users = await User.countDocuments();
  const jobs = await Job.countDocuments();
  res.status(StatusCodes.OK).json({ users, jobs });
};

export const updateUser = async (req, res) => {
  const userObj = { ...req.body }; // spread the data coming in into an object
  delete userObj.password; // delete the password field from the object
  const user = await User.findByIdAndUpdate(req.user.userId, userObj);
  res.status(StatusCodes.OK).json({ msg: "Update User" });
};

export const getAllUsers = async (req, res) => {
  const users = await User.find({});
  res.status(StatusCodes.OK).json({ users });
};
