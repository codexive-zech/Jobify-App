import express from "express";
import {
  getAppStats,
  getCurrentUser,
  updateUser,
  getAllUsers,
} from "../controllers/userController.js";
import { validateUpdateUserInput } from "../middlewares/validationMiddleware.js";
import { authorizedPermission } from "../middlewares/authMiddleware.js";
import upload from "../middlewares/multerMiddleware.js";

const router = express.Router();
router.route("/").get(getAllUsers);
router.route("/current-user").get(getCurrentUser);
router.route("/admin/stats").get(authorizedPermission("admin"), getAppStats);
router.route("/update-user").patch(
  upload.single("avatar"), // The .single() method used on the upload instance from multer is used to indicate that only 1 file will be uploaded and the avatar field specifies the field for DB
  validateUpdateUserInput,
  updateUser
);

export default router;
