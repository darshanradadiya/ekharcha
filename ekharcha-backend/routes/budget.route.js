import express from "express";
import {
  addSpentToBudget,
  createBudget,
  deleteBudget,
  getBudgetById,
  getBudgets,
  getBudgetsByCategory,
  updateBudget,
} from "../controllers/budget.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = express.Router();

// Create new budget
router.post("/", authenticate, createBudget);

// Get all budgets for logged-in user
router.get("/", authenticate, getBudgets);

// Get budget by ID
router.get("/:id", authenticate, getBudgetById);

// Search by category (query param: ?category=Food)
router.get("/search/category", authenticate, getBudgetsByCategory);

// Update budget
router.put("/:id", authenticate, updateBudget);

// Delete budget
router.delete("/:id", authenticate, deleteBudget);

// ...other routes...
router.post("/add-spent", authenticate, addSpentToBudget);

export default router;
