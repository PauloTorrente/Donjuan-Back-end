import express from 'express';
import { getUserById, updateUser, confirmUser, updateWishlist } from './users.controller.js';

const router = express.Router();

router.get('/:id', getUserById);
router.patch('/:id', updateUser);
router.get('/confirm/:token', confirmUser);
router.patch('/wishlist', updateWishlist); 

export default router;
