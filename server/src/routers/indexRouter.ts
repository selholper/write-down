import { Router } from 'express';
import userRouter from './userRouter';
import noteRouter from './noteRouter';

const router = Router();
router.use('/user', userRouter);
router.use('/note', noteRouter);

export default router;