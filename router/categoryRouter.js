import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { categoryController } from '../container/container.js';

const router = Router();

router.use(authMiddleware);
router.get('/', categoryController.getCategories);
router.post('/', categoryController.createCategory);
router.put('/:id', categoryController.updateCategory);
router.delete('/:id', categoryController.deleteCategory);
router.get('/:id', categoryController.getCategoryById);

export default router;
