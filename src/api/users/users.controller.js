import * as usersService from './users.service.js';
import User from '../users/users.model.js';
import mongoose from 'mongoose';

export const getUserById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid ID format' });
  }

  try {
    const user = await usersService.getUserById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Error fetching user', error: error.message });
  }
};

export const confirmUser = async (req, res) => {
  const { token } = req.params;
  console.log('Attempting to confirm user with token:', token);

  try {
    const user = await User.findOne({ confirmationToken: token });
    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    const expirationTime = 5 * 60 * 1000; // 5 minutes in milliseconds
    const isExpired = Date.now() - new Date(user.createdAt).getTime() > expirationTime;

    if (isExpired) {
      return res.status(400).json({ message: 'Token has expired' });
    }

    user.isConfirmed = true;
    user.confirmationToken = undefined; 
    await user.save();

    return res.status(200).json({ message: 'User confirmed successfully' });
  } catch (error) {
    console.error('Error confirming user:', error);
    res.status(500).json({ message: 'Error confirming user', error: error.message });
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
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Error updating user', error: error.message });
  }
};

export const updateWishlist = async (req, res) => {
  const { userId, itemId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const itemIndex = user.wishList.indexOf(itemId);
    if (itemIndex > -1) {
      user.wishList.splice(itemIndex, 1); // Remove item
    } else {
      user.wishList.push(itemId); // Add item
    }

    await user.save();
    res.status(200).json({ message: 'Wishlist updated successfully', wishList: user.wishList });
  } catch (error) {
    console.error('Error updating wishlist:', error);
    res.status(500).json({ message: 'Error updating wishlist', error: error.message });
  }
};
