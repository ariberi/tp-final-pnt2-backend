import { Router } from 'express';
import { updateUser } from '../controllers/UserController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = Router();

router.put('/', authMiddleware, updateUser);

export default router;