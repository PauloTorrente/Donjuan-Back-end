import * as clothesService from './clothes.service.js';

export const addClothes = async (req, res) => {
  try {
    const clothesData = req.body;
    const newClothes = await clothesService.addClothes(clothesData);
    res.status(201).json(newClothes);
  } catch (error) {
    res.status(500).json({ message: 'Error adding clothes', error });
  }
};
