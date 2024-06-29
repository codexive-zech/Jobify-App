import express from "express";
const router = express.Router();
import {
  createJob,
  deleteJob,
  getJobs,
  getSingleJob,
  showJobStats,
  updateJob,
} from "../controllers/jobController.js";
import {
  validateIdParam,
  validateJobInput,
} from "../middlewares/validationMiddleware.js";

router.route("/").get(getJobs).post(validateJobInput, createJob);
router.route("/stats").get(showJobStats);
router
  .route("/:id")
  .get(validateIdParam, getSingleJob)
  .patch(validateJobInput, validateIdParam, updateJob)
  .delete(validateIdParam, deleteJob);

export default router;
