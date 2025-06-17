import { Router } from 'express';
import { createMovement, getMovements, getMovementsByCategory, updateMovement, deleteMovement } from '../controllers/MovementController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = Router();

router.use(authMiddleware);
router.get('/', getMovements);
router.get('/category/:categoryId', getMovementsByCategory);
router.post('/', createMovement);
router.put('/:id', updateMovement);
router.delete('/:id', deleteMovement);

export default router;