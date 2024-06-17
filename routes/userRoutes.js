import express from "express";
import {
  getAppStats,
  getCurrentUser,
  updateUser,
  getAllUsers,
} from "../controllers/userController.js";
import { validateUpdateUserInput } from "../middlewares/validationMiddleware.js";
import { authorizedPermission } from "../middlewares/authMiddleware.js";

const router = express.Router();
router.route("/").get(getAllUsers);
router.route("/current-user").get(getCurrentUser);
router.route("/admin/stats").get(authorizedPermission("admin"), getAppStats);
router.route("/update-user").patch(validateUpdateUserInput, updateUser);

export default router;
