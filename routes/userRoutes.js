import express from "express";
import {
  getAppStats,
  getCurrentUser,
  updateUser,
} from "../controllers/userController.js";
import { validateUpdateUserInput } from "../middlewares/validationMiddleware.js";

const router = express.Router();

router.route("/current-user").get(getCurrentUser);
router.route("/admin/stats").get(getAppStats);
router.route("/update-user").patch(validateUpdateUserInput, updateUser);

export default router;
