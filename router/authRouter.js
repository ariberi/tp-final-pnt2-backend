import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { authController } from '../container/container.js';

const router = Router();

router.post('/login', authController.login);
router.post('/register', authController.register);
router.post('/logout', authController.logout);
router.get('/me', authMiddleware, authController.me); 

export default router;