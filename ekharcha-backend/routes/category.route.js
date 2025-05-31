import express from 'express';
import {
    createCategory,
    deleteCategory,
    getCategories,
    getCategoriesByType,
    getCategoriesByTypeAndLabel,
    getCategoryById,
    getCategoryByLabel,
    updateCategory
} from '../controllers/category.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';

const router = express.Router();

router.use(authenticate);

router.post('/', createCategory);
router.get('/', getCategories);
router.get('/type/:type', getCategoriesByType);
router.get('/label/:label', getCategoryByLabel);
router.get('/type/:type/label/:label', getCategoriesByTypeAndLabel);
router.get('/:id', getCategoryById);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);

export default router;
