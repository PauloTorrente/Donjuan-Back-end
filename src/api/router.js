import express from 'express';
import authRouter from './auth/auth.router.js';
import clothesRouter from './clothes/clothes.router.js';
import usersRouter from './users/users.router.js';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/clothes', clothesRouter);
router.use('/users', usersRouter);

export default router;
