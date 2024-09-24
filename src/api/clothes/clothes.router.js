import express from 'express';
import { addClothes } from './clothes.controller.js';
import { protect } from '../../middlewares/auth.middleware.js'; 

const router = express.Router();

router.post('/', protect, addClothes);

export default router;
