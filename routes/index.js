import express from "express";
import authRoute from "./authRoute.js";
import userRoute from "./userRoute.js";
import exportRoute from "./expertRoute.js";
import majorRoute from "./majorRoute.js";
import certificateRoute from "./certificateRoute.js";
import jobRequestRoute from "./jobRequestRoute.js";
import reviewRoute from "./reviewRoute.js";
import transactionRoute from "./transactionRoute.js";

const router = express.Router();

router.use("/auth", authRoute);
router.use("/users", userRoute);
router.use("/experts", exportRoute);
router.use("/majors", majorRoute);
router.use("/certificates", certificateRoute);
router.use("/job_requests", jobRequestRoute);
router.use("/reviews", reviewRoute);
router.use("/transactions", transactionRoute);

export default router;
