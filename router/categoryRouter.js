import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
// import {
//   createCategory, getCategories, updateCategory, deleteCategory
// } from '../controllers/CategoryController.js';
import { categoryController } from '../container/container.js'

const router = Router();

router.use(authMiddleware);
// router.get('/', getCategories);
// router.post('/', createCategory);
// router.put('/:id', updateCategory);
// router.delete('/:id', deleteCategory);
router.get('/', categoryController.getAllCategories);
router.post('/', categoryController.createCategory);
router.put('/:id', categoryController.updateCategory);
router.delete('/:id', categoryController.deleteCategory);
router.get('/:id', categoryController.getCategoryById);



export default router;
