import express from "express";
const router = express.Router();
import rateLimit from "express-rate-limit";

import {
  loginUser,
  logout,
  registerUser,
} from "../controllers/authController.js";
import {
  validateLoginInput,
  validateRegisterInput,
} from "../middlewares/validationMiddleware.js";

const apiLimiter = rateLimit({
  windowMs: 1000 * 60 * 15,
  max: 15,
  message: { message: "IP Rate Limit Exceeded, Try in 15 Minutes" },
});

router.route("/register").post(apiLimiter, validateRegisterInput, registerUser);
router.route("/login").post(apiLimiter, validateLoginInput, loginUser);
router.route("/logout").get(logout);

export default router;
