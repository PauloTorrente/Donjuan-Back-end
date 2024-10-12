import * as clothesService from './clothes.service.js';

// Function to add clothes
export const addClothes = async (req, res) => {
  try {
    const clothesData = req.body;
    const newClothes = await clothesService.addClothes(clothesData);
    res.status(201).json(newClothes);
  } catch (error) {
    console.error('Error adding clothes:', error);
    res.status(500).json({ message: 'Error adding clothes', error: error.message });
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
    console.error('Error retrieving clothes by size:', error);
    res.status(500).json({ message: 'Error retrieving clothes by size', error: error.message });
  }
};
// Function to update clothes
export const updateClothes = async (req, res) => {
  const { id } = req.params; // Get the id from the request parameters
  const updateData = req.body; // Get the data to update

  try {
    const updatedClothes = await clothesService.updateClothes(id, updateData);
    if (!updatedClothes) {
      return res.status(404).json({ message: 'Clothing item not found' });
    }
    res.status(200).json(updatedClothes);
  } catch (error) {
    console.error('Error updating clothes:', error);
    res.status(500).json({ message: 'Error updating clothes', error: error.message });
  }
};


// Function to get all clothes or filter by piece
export const getClothes = async (req, res) => {
  const { piece } = req.query;
  try {
    const clothes = await clothesService.findClothesByPiece(piece);
    if (!clothes.length) {
      return res.status(404).json({ message: 'No clothes found' });
    }
    res.status(200).json(clothes);
  } catch (error) {
    console.error('Error retrieving clothes:', error);
    res.status(500).json({ message: 'Error retrieving clothes', error: error.message });
  }
};
