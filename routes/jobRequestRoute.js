import express from "express";
import controller from "../controllers/jobRequestController.js";
import { auth, checkRole } from "../middlewares/authorization.js";
import { roles } from "../config/constant.js";

const router = express.Router();

router.get("", auth, controller.getJobRequestsPagination);
router.post("", auth, checkRole([roles.USER]), controller.createJobRequest);
router.get("/:job_request_id", auth, controller.getJobRequestById);
router.put(
  "/:job_request_id",
  auth,
  checkRole([roles.USER]),
  controller.updateJobRequest
);
router.post(
  "/:job_request_id/accept",
  auth,
  checkRole([roles.EXPERT]),
  controller.acceptJobRequest
);
router.post(
  "/:job_request_id/cancel",
  auth,
  checkRole([roles.EXPERT]),
  controller.cancelJobRequest
);
router.post(
  "/:job_request_id/complete",
  auth,
  checkRole([roles.USER]),
  controller.completeJobRequest
);
export default router;
