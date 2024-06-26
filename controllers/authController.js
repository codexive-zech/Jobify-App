import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import { comparePassword, passwordHashed } from "../utils/passwordUtils.js";
import {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
} from "../errors/customError.js";
import { createJWT } from "../utils/tokenUtil.js";

export const registerUser = async (req, res) => {
  const isFirstAccount = (await User.countDocuments()) === 0;

  req.body.role = isFirstAccount ? "admin" : "user";

  const hashedPassword = await passwordHashed(req.body.password); // hashing the current password

  req.body.password = hashedPassword; // setting and updating the hashed password as the new value for password

  const user = await User.create(req.body);

  res
    .status(StatusCodes.CREATED)
    .json({ msg: "User Created Successfully", user });
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Please Provide Valid Credentials");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials");
  }

  const isPasswordCorrect = await comparePassword(password, user.password); // comparing the password added via the login Input and the hashed password in the DB

  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Please Provide a Valid Password");
  }

  const token = createJWT({ userId: user._id, role: user.role });

  const oneDay = 1000 * 60 * 60 * 24;

  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === "production",
  });

  res.status(StatusCodes.OK).json({ msg: "Logged In Successfully" });
};

export const logout = (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: "User Logged Out" });
};
