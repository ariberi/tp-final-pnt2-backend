import { application, Router } from 'express';
import authRouter from './authRouter.js';
import userRouter from './userRouter.js';
import movementRouter from './movementRouter.js';
import categoryRouter from './categoryRouter.js';
import userRouter from './userRouter.js';

const router = Router();

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/movement', movementRouter);
router.use('/categories', categoryRouter);

app.use('/users', userRouter);

console.log("✅ Router index cargado");


export default router;