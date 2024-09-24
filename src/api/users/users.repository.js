import User from './users.model.js';

export const getById = async (id) => {
  return await User.findById(id).exec(); // Use exec() for better error handling
};

export const update = async (id, updatedData) => {
  return await User.findByIdAndUpdate(id, updatedData, { new: true }).exec();
};
