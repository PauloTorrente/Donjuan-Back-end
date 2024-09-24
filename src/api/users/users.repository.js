import User from './users.model.js';

export const getById = async (id) => {
  return await User.findById(id);
};

export const update = async (id, updatedData) => {
  return await User.findByIdAndUpdate(id, updatedData, { new: true });
};
