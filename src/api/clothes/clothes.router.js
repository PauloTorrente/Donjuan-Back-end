import express from 'express';
import { addClothes, getClothesBySize, getClothes, updateClothes, getClothesById } from './clothes.controller.js';
import { protect } from '../../middlewares/auth.middleware.js';

const router = express.Router();

// POST route to add clothes (protected)
router.post('/', protect, addClothes);

// GET route to fetch clothes by size
router.get('/sizes/:size', getClothesBySize);

// GET route to fetch all clothes or by piece (query param)
router.get('/', getClothes);

// GET route to fetch clothes by ID
router.get('/:id', getClothesById);

// PATCH route to update clothes (protected)
router.patch('/:id', protect, updateClothes); 

export default router;
