import { Router } from 'express';
import { userController } from '../container/container.js'
// import {updateUser} from '../controllers/UserController.js';
// import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = Router();

// router.use(authMiddleware);
// router.patch('/', updateUser);
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUser);
router.post('/', userController.createUser);
router.delete('/:id', userController.deleteUser);

export default router;