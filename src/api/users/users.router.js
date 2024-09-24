import express from 'express';
import { getUserById, updateUser, confirmUser } from './users.controller.js';

const router = express.Router();

router.get('/:id', getUserById);
router.patch('/:id', updateUser);
router.get('/confirm/:token', confirmUser);

export default router;
