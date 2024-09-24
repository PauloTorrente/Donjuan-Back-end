import * as usersService from './users.service.js';
import User from '../users/users.model.js';

export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await usersService.getUserById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user', error });
  }
};

export const confirmUser = async (req, res) => {
  const { token } = req.params;

  try {
    const user = await User.findOne({ confirmationToken: token });
    if (!user) {
      return res.status(400).json({ message: 'Token inválido o expirado' });
    }

    user.isConfirmed = true;
    user.confirmationToken = undefined; // Clear the token after confirmation
    await user.save();

    return res.status(200).json({ message: 'Usuario confirmado con éxito' });
  } catch (error) {
    return res.status(500).json({ message: 'Error confirming user', error });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  try {
    const updatedUser = await usersService.updateUser(id, updatedData);
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error });
  }
};
