import * as clothesRepository from './clothes.repository.js'; 
import Clothes from './clothes.model.js'; 

// Add new clothes
export const addClothes = async (clothesData) => {
  if (clothesData.discount > 0) {
    clothesData.price = clothesData.price - (clothesData.price * (clothesData.discount / 100));
  }
  return await clothesRepository.create(clothesData); 
};

// Find clothes by size
export const findClothesBySize = async (size) => {
  return await clothesRepository.findBySize(size); 
};

// Update clothes
export const updateClothes = async (id, updateData) => {
  if (updateData.discount > 0) {
    updateData.price = updateData.price - (updateData.price * (updateData.discount / 100));
  }
  return await Clothes.findByIdAndUpdate(id, updateData, { new: true }); 
};

// Find clothes by piece or return all clothes
export const findClothesByPiece = async (piece) => {
  const query = piece ? { piece } : {};
  return await clothesRepository.find(query); 
};

// Find clothes by ID
export const findById = async (id) => {
  return await Clothes.findById(id); 
};
