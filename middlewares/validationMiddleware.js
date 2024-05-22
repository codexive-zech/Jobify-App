import { body, validationResult } from "express-validator";
import { BadRequestError } from "../errors/customError.js";

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

export const validateTest = withValidationMiddleware([
  body("name")
    .notEmpty()
    .withMessage("Please Provide Name")
    .isLength({ min: 3, max: 50 })
    .withMessage("Name Must be between 3 - 50 Character Long"),
]);
