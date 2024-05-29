import { body, param, validationResult } from "express-validator";
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from "../errors/customError.js";
import { JobStatus, JobType } from "../utils/constant.js";
import mongoose from "mongoose";
import Job from "../models/Job.js";
import User from "../models/User.js";

const withValidationMiddleware = (validationRules) => {
  return [
    validationRules, // setup validation rules
    (req, res, next) => {
      const error = validationResult(req);
      if (!error.isEmpty()) {
        const errorMessage = error
          .array()
          .map((err) => err.msg)
          .join(", ");
        if (errorMessage[0].startsWith("No Job")) {
          throw new NotFoundError(errorMessage);
        } // display this error if the Job id does not exist in the DB
        if (errorMessage[0].startsWith("Not Authorized")) {
          throw new UnauthorizedError(errorMessage);
        } // display this error if the job trying to be accessed isn't accessed by the original owner
        throw new BadRequestError(errorMessage);
      }
      next();
    }, // checking for validation errors if they exist
  ];
};

export const validateJobInput = withValidationMiddleware([
  body("company").notEmpty().withMessage("Please Provide Company Name"),
  body("position").notEmpty().withMessage("Please Provide Job Position"),
  body("jobLocation").notEmpty().withMessage("Please Provide Job Location"),
  body("jobStatus")
    .isIn(Object.values(JobStatus))
    .withMessage("Invalid Job Status Value"),
  body("jobType")
    .isIn(Object.values(JobType))
    .withMessage("Invalid Job Type Value"),
]);

export const validateIdParam = withValidationMiddleware([
  param("id").custom(async (value, { req }) => {
    const isValidIdLength = mongoose.Types.ObjectId.isValid(value); // checking for length of the ID
    if (!isValidIdLength) {
      throw new BadRequestError("Invalid MongoDB Id");
    } // error to display if the length is big/less than the actual MongoDB Id
    const job = await Job.findById(value);
    if (!job) {
      throw new NotFoundError(`No Job With ID ${value}`);
    }
    // Checking To Know if the User Making the Request is the original owner
    const isAdmin = req.user.role === "admin";
    const isJobOwner = req.user.userId === job.createdBy.toString();

    if (!isAdmin && !isJobOwner) {
      throw new UnauthorizedError("Not Authorized To Access This Route");
    }
  }),
]);

export const validateRegisterInput = withValidationMiddleware([
  body("name").notEmpty().withMessage("Please Provide Name"),
  body("email")
    .notEmpty()
    .withMessage("Please Provide Email")
    .isEmail()
    .withMessage("Invalid Email Address")
    .custom(async (value) => {
      const user = await User.findOne({ email: value });
      if (user) {
        throw new BadRequestError("Email Already Exist");
      }
    }), // To distinguish Unique Email
  body("password")
    .notEmpty()
    .withMessage("Please Provide Password")
    .isLength({ min: 8 })
    .withMessage("Password Must be  Character Long"),
  body("lastName").notEmpty().withMessage("Please Provide Last Name"),
  body("location").notEmpty().withMessage("Please Provide Location"),
]);

export const validateLoginInput = withValidationMiddleware([
  body("email")
    .notEmpty()
    .withMessage(" Please Provide Email")
    .isEmail()
    .withMessage("Invalid Email Address"),
  body("password").notEmpty().withMessage("Please Provide Password"),
]);

export const validateUpdateUserInput = withValidationMiddleware([
  body("name").notEmpty().withMessage("Please Provide Name"),
  body("email")
    .notEmpty()
    .withMessage("Please Provide Email")
    .isEmail()
    .withMessage("Invalid Email Address")
    .custom(async (value, { req }) => {
      const user = await User.findOne({ email: value });
      if (user && user._id.toString() !== req.user.userId) {
        throw new BadRequestError("Email Already Exist");
      }
    }), // To distinguish Unique Email
  body("lastName").notEmpty().withMessage("Please Provide Last Name"),
  body("location").notEmpty().withMessage("Please Provide Location"),
]);
