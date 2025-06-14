import { Router } from 'express';
import authRouter from './authRouter.js';
import userRouter from './userRouter.js';
import expenseRouter from './expenseRouter.js';
import categoryRouter from './categoryRouter.js';

const router = Router();

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/expenses', expenseRouter);
router.use('/categories', categoryRouter);


export default router;