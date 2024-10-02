import * as clothesRepository from './clothes.repository.js'; 
import Clothes from './clothes.model.js'; 

// Transform Google Drive URL to a thumbnail URL
const transformRowUrl = (rowUrl) => {
  const regex = /\/d\/([a-zA-Z0-9_-]+)/; // Regex para el formato estándar
  const match = rowUrl.match(regex);
  
  if (match) {
    return `https://drive.google.com/thumbnail?id=${match[1]}&sz=w1000`; // Usar el ID extraído
  }

  // Manejar el formato de vista
  const viewRegex = /\/file\/d\/([a-zA-Z0-9_-]+)/; // Regex para el formato de vista
  const viewMatch = rowUrl.match(viewRegex);
  
  if (viewMatch) {
    return `https://drive.google.com/thumbnail?id=${viewMatch[1]}&sz=w1000`; // Usar el ID extraído
  }

  return null; // Retornar null si no se encuentra un ID válido
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
//test