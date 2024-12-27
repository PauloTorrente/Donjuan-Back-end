import * as clothesService from './clothes.service.js';

export const addClothes = async (req, res) => {
  try {
    const { discount = 0, ...clothesData } = req.body;
    const newClothes = await clothesService.addClothes({ ...clothesData, discount });
    res.status(201).json(newClothes);
  } catch (error) {
    res.status(500).json({ message: 'Error adding clothes', error: error.message });
  }
};

export const getClothesBySize = async (req, res) => {
  const { size } = req.params;
  try {
    const clothes = await clothesService.findClothesBySize(size);
    if (!clothes.length) {
      return res.status(404).json({ message: 'No clothes found for this size' });
    }
    res.status(200).json(clothes);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving clothes by size', error: error.message });
  }
};

export const getClothesById = async (req, res) => {
  const { id } = req.params;
  try {
    const clothes = await clothesService.findById(id);
    if (!clothes) {
      return res.status(404).json({ message: 'Clothing item not found' });
    }
    res.status(200).json(clothes);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving clothes by ID', error: error.message });
  }
};

export const updateClothes = async (req, res) => {
  const { id } = req.params;
  const { discount, ...updateData } = req.body;
  const updatedData = { ...updateData };

  if (discount !== undefined) {
    updatedData.discount = discount;
  }

  try {
    const updatedClothes = await clothesService.updateClothes(id, updatedData);
    if (!updatedClothes) {
      return res.status(404).json({ message: 'Clothing item not found' });
    }
    res.status(200).json(updatedClothes);
  } catch (error) {
    res.status(500).json({ message: 'Error updating clothes', error: error.message });
  }
};

export const getClothes = async (req, res) => {
  const { piece } = req.query;
  try {
    const clothes = await clothesService.findClothesByPiece(piece);
    if (!clothes.length) {
      return res.status(404).json({ message: 'No clothes found' });
    }
    res.status(200).json(clothes);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving clothes', error: error.message });
  }
};
