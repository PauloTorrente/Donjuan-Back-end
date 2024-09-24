import * as usersService from './users.service.js';

export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await usersService.getUserById(id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user', error });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  try {
    const updatedUser = await usersService.updateUser(id, updatedData);
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error });
  }
};
