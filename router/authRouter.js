import { Router } from 'express';
// import { register, login, logout, me} from '../controllers/AuthController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { authController } from '../container/container'



const router = Router();

// router.post('/register', register);
// router.post('/login', login);
// router.post('/logout', logout);
// router.get('/me',authMiddleware, me);
router.post('./login', authController.login);
router.post('./register', authController.register);
router.post('/logout', authController.logout);
router.get('/me', authMiddleware, authController.me); 

export default router;