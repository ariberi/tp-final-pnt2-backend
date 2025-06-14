import { Router } from 'express';
import { createExpense, getExpenses, getExpensesByCategory, updateExpense, deleteExpense } from '../controllers/ExpenseController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = Router();

router.use(authMiddleware);
router.get('/', getExpenses);
router.get('/category/:categoryId', getExpensesByCategory);
router.post('/', createExpense);
router.put('/:id', updateExpense);
router.delete('/:id', deleteExpense);

export default router;