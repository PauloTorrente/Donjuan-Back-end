import User from './users.model.js';

export const getById = async (id) => {
  return await User.findById(id).exec();
};

export const update = async (id, updatedData) => {
  return await User.findByIdAndUpdate(id, updatedData, { new: true }).exec();
};

export const create = async (userData) => {
  const user = new User(userData);
  return await user.save();
};
