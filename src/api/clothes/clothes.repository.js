import Clothes from './clothes.model.js';

// Create new clothes
export const create = async (clothesData) => {
  return await Clothes.create(clothesData);
};

// Find clothes by size
export const findBySize = async (size) => {
  return await Clothes.find({ sizes: size });
};

// Find clothes by query (general)
export const find = async (query) => {
  return await Clothes.find(query);
};
