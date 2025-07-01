import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { userController } from '../container/container.js';

const router = Router();

router.use(authMiddleware);
router.patch('/', userController.updateUser);
// router.get('/', userController.getAllUsers);
// router.get('/:id', userController.getUser);
// router.post('/', userController.createUser);
// router.delete('/:id', userController.deleteUser);

export default router;