import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import { passwordHashed } from "../utils/passwordUtils.js";

export const registerUser = async (req, res) => {
  const isFirstAccount = (await User.countDocuments()) === 0;
  req.body.role = isFirstAccount ? "admin" : "user";
  const hashedPassword = await passwordHashed(req.body.password);
  req.body.password = hashedPassword;
  const user = await User.create(req.body);
  res
    .status(StatusCodes.CREATED)
    .json({ msg: "User Created Successfully", user });
};

export const loginUser = async (req, res) => {
  res.send("Login User");
};
