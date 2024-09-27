import * as clothesRepository from './clothes.repository.js';
import Clothes from './clothes.model.js'; 

const transformRowUrl = (rowUrl) => {
  const splitedRowUrl = rowUrl.split('/');
  const imgId = splitedRowUrl[5];
  const url = `https://drive.google.com/thumbnail?id=${imgId}&sz=w1000`;
  return url;
};

export const addClothes = async (clothesData) => {
  if (clothesData.imageUrl) {
    clothesData.imageUrl = transformRowUrl(clothesData.imageUrl);
  }
  return await clothesRepository.create(clothesData);
};

export const findClothesBySize = async (size) => {
  return await clothesRepository.findBySize(size);
};

export const getAllClothes = async () => {
  return await Clothes.find(); // Fetch all clothes
};