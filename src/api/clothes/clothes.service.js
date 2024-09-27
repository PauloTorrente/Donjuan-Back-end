import * as clothesRepository from './clothes.repository.js'; 
import Clothes from './clothes.model.js'; 

// Transform Google Drive URL to a thumbnail URL
const transformRowUrl = (rowUrl) => {
  const splitedRowUrl = rowUrl.split('/');
  const imgId = splitedRowUrl[5];
  return `https://drive.google.com/thumbnail?id=${imgId}&sz=w1000`;
};

// Add new clothes
export const addClothes = async (clothesData) => {
  if (clothesData.imageUrl) {
    clothesData.imageUrl = transformRowUrl(clothesData.imageUrl);
  }
  return await clothesRepository.create(clothesData); // Delegate to repository
};

// Find clothes by size
export const findClothesBySize = async (size) => {
  return await clothesRepository.findBySize(size); // Use repository for size
};

// Find clothes by piece or return all clothes
export const findClothesByPiece = async (piece) => {
  const query = piece ? { piece } : {};
  return await clothesRepository.find(query); // Fetch based on piece or all
};
