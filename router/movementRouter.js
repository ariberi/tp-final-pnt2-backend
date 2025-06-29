import { Router } from 'express';
// import {
//     createMovement,
//     getMovements,
//     getMovementsByCategory,
//     updateMovement,
//     deleteMovement,
//     getAllIncomes,
//     getAllExpenses
// } from '../controllers/MovementController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { movementController } from '../container/container.js'

const router = Router();

router.use(authMiddleware);

router.post('/', movementController.createMovement);
router.get('/', movementController.getMovements);
router.get('/category/:categoryId', movementController.getMovementsByCategory);
router.get('/incomes', movementController.getAllIncomes);
router.get('/expenses', movementController.getAllExpenses);
router.put('/:id', movementController.updateMovement);
router.delete('/:id', movementController.deleteMovement);

export default router;