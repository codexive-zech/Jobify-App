import { StatusCodes } from "http-status-codes";
import User from "../models/User.js";
import Job from "../models/Job.js";
import cloudinary from "cloudinary";
import { promises as fs } from "fs";
import path from "path";

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
  const newUser = { ...req.body }; // spread the data coming in into an object
  delete newUser.password; // delete the password field from the object
  if (req.file) {
    const filePath = path.join(req.file.destination, req.file.originalname); // join the directory and file name to get a single File Path for images
    const response = await cloudinary.v2.uploader.upload(filePath, {
      use_filename: true,
      folder: "profile-image",
    }); // upload image file available from form-data in FE
    await fs.unlink(filePath); // remove the uploaded file from the local file storage server
    newUser.avatar = response.secure_url;
    newUser.avatarPublicId = response.public_id;
  } // upload image file only if it exist in the form-data

  const updatedUser = await User.findByIdAndUpdate(req.user.userId, newUser); // update the User data with the added fields

  if (req.file && updatedUser.avatarPublicId) {
    await cloudinary.v2.uploader.destroy(updatedUser.avatarPublicId);
  } // remove old image file from cloudinary base on the avatar-public-id when we upload another new image

  res.status(StatusCodes.OK).json({ msg: "Update User" });
};

export const getAllUsers = async (req, res) => {
  const users = await User.find({});
  res.status(StatusCodes.OK).json({ users });
};
