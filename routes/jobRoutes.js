import express from "express";
const router = express.Router();
import {
  createJob,
  deleteJob,
  getJobs,
  getSingleJob,
  updateJob,
} from "../controllers/jobController.js";

router.route("/").get(getJobs).post(createJob);
router.route("/:id").get(getSingleJob).patch(updateJob).delete(deleteJob);

export default router;
