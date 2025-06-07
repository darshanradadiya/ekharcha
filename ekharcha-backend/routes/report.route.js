import express from "express";
import { getCategoryBreakdown, getMonthlyReport } from "../controllers/report.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/monthly", authenticate, getMonthlyReport);
router.get("/category-breakdown", authenticate, getCategoryBreakdown);

export default router;