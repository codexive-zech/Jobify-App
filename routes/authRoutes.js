import express from "express";

const router = express.Router();

import {
  loginUser,
  logout,
  registerUser,
} from "../controllers/authController.js";
import {
  validateLoginInput,
  validateRegisterInput,
} from "../middlewares/validationMiddleware.js";

router.route("/register").post(validateRegisterInput, registerUser);
router.route("/login").post(validateLoginInput, loginUser);
router.route("/logout").get(logout);

export default router;
