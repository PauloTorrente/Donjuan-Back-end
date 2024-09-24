import express from 'express';
import { getUserById, updateUser } from './users.controller.js';

const router = express.Router();

router.get('/:id', getUserById);
router.patch('/:id', updateUser);

export default router;
