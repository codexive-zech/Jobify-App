import express from "express";
const router = express.Router();
import {
  createJob,
  deleteJob,
  getJobs,
  getSingleJob,
  updateJob,
} from "../controllers/jobController.js";
import { validateJobInput } from "../middlewares/validationMiddleware.js";

router.route("/").get(getJobs).post(validateJobInput, createJob);
router
  .route("/:id")
  .get(getSingleJob)
  .patch(validateJobInput, updateJob)
  .delete(deleteJob);

export default router;
