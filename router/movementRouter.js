import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { movementController } from '../container/container.js';

const router = Router();

router.use(authMiddleware);

router.get('/', movementController.getMovements);
router.get('/category/:categoryId', movementController.getMovementsByCategory);
router.get('/incomes', movementController.getAllIncomes);
router.get('/expenses', movementController.getAllExpenses);
router.post('/', movementController.createMovement);
router.put('/:id', movementController.updateMovement);
router.delete('/:id', movementController.deleteMovement);

export default router;