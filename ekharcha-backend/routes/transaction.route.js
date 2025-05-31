import express from 'express';
import {
    addTransaction,
    calculateTotalAmount,
    deleteTransaction,
    editTransaction,
    getAllTransactions,
    getCategorywiseSummary,
    getMonthlySummary,
    getTransactionById,
    getTransactionsByAccount,
    getTransactionsByCategory,
    getTransactionsByType,
    getTransactionSummary
} from '../controllers/transaction.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';

const router = express.Router();

router.use(authenticate);

router.post('/', addTransaction);
router.get('/', getAllTransactions);
router.get('/summary', getTransactionSummary);
router.get('/monthly', getMonthlySummary);
router.get('/category-summary', getCategorywiseSummary);

router.get('/type/:type', getTransactionsByType);
router.get('/total/:type', calculateTotalAmount);
router.get('/category/:categoryId', getTransactionsByCategory);
router.get('/account/:accountId', getTransactionsByAccount);

router.get('/:id', getTransactionById);
router.put('/:id', editTransaction);
router.delete('/:id', deleteTransaction);

export default router;
