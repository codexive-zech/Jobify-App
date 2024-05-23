import { body, param, validationResult } from "express-validator";
import { BadRequestError } from "../errors/customError.js";
import { JobStatus, JobType } from "../utils/constant.js";
import mongoose from "mongoose";

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
  param("id")
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage("Invalid MongoDB ID"),
]);
