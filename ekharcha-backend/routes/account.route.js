import express from 'express';
import {
    createAccount,
    deleteAccount,
    getAccountById,
    getAccounts,
    searchtype,
    updateAccount
} from '../controllers/account.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';

const router = express.Router();

router.use(authenticate);

router.post('/', createAccount);
router.get('/', getAccounts);
router.get('/search', searchtype);
router.get('/:id', getAccountById);
router.put('/:id', updateAccount);
router.delete('/:id', deleteAccount);

export default router;
