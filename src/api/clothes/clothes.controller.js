import * as clothesService from './clothes.service.js';

// Function to add clothes
export const addClothes = async (req, res) => {
  try {
    const clothesData = req.body;
    const newClothes = await clothesService.addClothes(clothesData);
    res.status(201).json(newClothes);
  } catch (error) {
    res.status(500).json({ message: 'Error adding clothes', error });
  }
};

// Function to get clothes by size
export const getClothesBySize = async (req, res) => {
  const { size } = req.params;
  try {
    const clothes = await clothesService.findClothesBySize(size);
    if (!clothes.length) {
      return res.status(404).json({ message: 'No clothes found for this size' });
    }
    res.status(200).json(clothes);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving clothes', error });
  }
};

// Function to get all clothes or by piece
export const getClothes = async (req, res) => {
  const { piece } = req.query;
  try {
    const clothes = await clothesService.findClothesByPiece(piece);
    res.status(200).json(clothes);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving clothes', error });
  }
};
