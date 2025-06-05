import express from "express";
import { getDashboardSummary }from "../controllers/dashboard.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
const router = express.Router();

router.get("/dashboard-summary", authenticate, getDashboardSummary);

export default router;
