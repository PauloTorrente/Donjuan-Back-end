import express from 'express';
import { addClothes, getClothesBySize } from './clothes.controller.js';
import { protect } from '../../middlewares/auth.middleware.js'; 

const router = express.Router();

router.post('/', protect, addClothes);

router.get('/sizes/:size', getClothesBySize);
router.get('/clothes', async (req, res) => {
    const piece = req.query.piece;
    try {
      const clothes = await Clothes.find(piece ? { piece } : {});
      res.json(clothes);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
export default router;
