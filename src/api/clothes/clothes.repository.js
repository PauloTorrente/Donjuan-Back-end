import Clothes from './clothes.model.js';

export const create = async (clothesData) => {
  const clothes = new Clothes(clothesData);
  return await clothes.save();
};

export const findBySize = async (size) => {
  return await Clothes.find({ sizes: size });
};