import express from "express";
import {
  addTransaction,
  deleteTransaction,
  editTransaction,
  getAllTransactions,
  getTransactionById,
} from "../controllers/transaction.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(authenticate);

router.post("/", addTransaction);
router.get("/", getAllTransactions);
router.get("/:id", getTransactionById);
router.put("/:id", editTransaction);
router.delete("/:id", deleteTransaction);

export default router;
