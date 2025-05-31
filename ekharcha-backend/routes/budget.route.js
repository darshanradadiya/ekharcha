import express from 'express';
import {
    createOrUpdateBudget,
    deleteBudget,
    getBudgetByUser,
    updateLastAlertSent
} from '../controllers/budget.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';

const router = express.Router();

router.use(authenticate);

router.post('/', createOrUpdateBudget);
router.get('/', getBudgetByUser);
router.delete('/', deleteBudget);
router.put('/alert', updateLastAlertSent);

export default router;
