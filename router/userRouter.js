import { Router } from 'express';
import {getUsers, updateUser} from '../controllers/UserController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = Router();

router.use(authMiddleware);
router.put('/', updateUser);
// router.get('/', getUsers);

export default router;