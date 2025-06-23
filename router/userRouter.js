import { Router } from 'express';
import {updateUser} from '../controllers/UserController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = Router();

router.use(authMiddleware);
router.patch('/', updateUser);

export default router;