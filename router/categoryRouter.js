import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import {
  createCategory, getCategories, updateCategory, deleteCategory
} from '../controllers/CategoryController.js';

const router = Router();

router.use(authMiddleware);
router.get('/', getCategories);
router.post('/', createCategory);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);

export default router;
