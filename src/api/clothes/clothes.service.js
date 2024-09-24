import * as clothesRepository from './clothes.repository.js';

// Función para transformar la URL
const transformRowUrl = (rowUrl) => {
  const splitedRowUrl = rowUrl.split('/');
  const imgId = splitedRowUrl[5];
  const url = `https://drive.google.com/thumbnail?id=${imgId}&sz=w1000`;
  return url;
};

export const addClothes = async (clothesData) => {
  // Transformar la URL de la imagen
  if (clothesData.imageUrl) {
    clothesData.imageUrl = transformRowUrl(clothesData.imageUrl);
  }
  return await clothesRepository.create(clothesData);
};