import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
export const registerUser = async (req, res) => {
  const isFirstAccount = (await User.countDocuments()) === 0;
  req.body.role = isFirstAccount ? "admin" : "user";
  const user = await User.create(req.body);
  res.status(StatusCodes.CREATED).json({ user });
};

export const loginUser = async (req, res) => {
  res.send("Login User");
};
