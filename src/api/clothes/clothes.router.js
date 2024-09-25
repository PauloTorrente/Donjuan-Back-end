import express from 'express';
import { addClothes, getClothesBySize } from './clothes.controller.js';
import { protect } from '../../middlewares/auth.middleware.js'; 

const router = express.Router();

router.post('/', protect, addClothes);

router.get('/sizes/:size', getClothesBySize);
export default router;
