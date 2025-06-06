import express from "express";
import {
  addSpentToBudget,
  createBudget,
  deleteBudget,
  editSpentInBudget,
  getBudgetById,
  getBudgets,
  updateBudget
} from "../controllers/budget.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = express.Router();

// Create new budget
router.post("/", authenticate, createBudget);

// Get all budgets for logged-in user
router.get("/", authenticate, getBudgets);

// Search by category (query param: ?category=Food)
// router.get("/search/category", authenticate, getBudgetsByCategory);

// Add spent to budget
router.post("/add-spent", authenticate, addSpentToBudget);

// router.put("/edit-spent/:id", editSpentInBudget);
router.put("/edit-spent/:id", authenticate, editSpentInBudget);

// Update budget
router.put("/:id", authenticate, updateBudget);

// Delete budget
router.delete("/:id", authenticate, deleteBudget);

// Get budget by ID (keep this LAST)
router.get("/:id", authenticate, getBudgetById);

export default router;
