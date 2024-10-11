import * as wishlistService from './wishlist.service.js';  // Import the service functions
import User from '../users/users.model.js';  // Import the user model

// Controller function to get the wishlist for a user
export const getWishlist = async (req, res) => {
  const { userId } = req.params;  // Extract userId from the request parameters
  try {
    const wishlist = await wishlistService.getWishlistByUserId(userId);  // Call the service function
    console.log('Fetched Wishlist:', wishlist);  // Log the fetched wishlist
    res.status(200).json(wishlist);  // Send the wishlist back as a JSON response
  } catch (error) {
    console.error('Error fetching wishlist:', error);  // Log any error that occurs
    res.status(500).json({ message: 'Error fetching wishlist', error: error.message });  // Return error status with the message
  }
};

// Controller function to add an item to the wishlist
export const addToWishlist = async (req, res) => {
  const { userId, itemId } = req.body;  // Extract userId and itemId from the request body
  try {
    const updatedWishlist = await wishlistService.addItemToWishlist(userId, itemId);  // Call service function to add the item
    res.status(200).json(updatedWishlist);  // Send the updated wishlist back as a JSON response
  } catch (error) {
    console.error('Error adding to wishlist:', error);  // Log any error that occurs
    res.status(500).json({ message: 'Error adding to wishlist', error: error.message });  // Return error status with the message
  }
};

// Controller function to remove an item from the wishlist
export const removeFromWishlist = async (req, res) => {
  const { userId, itemId } = req.body;  // Extract userId and itemId from the request body
  try {
    const updatedWishlist = await wishlistService.removeItemFromWishlist(userId, itemId);  // Call the service function to remove the item
    res.status(200).json(updatedWishlist);  // Send the updated wishlist back as a JSON response
  } catch (error) {
    console.error('Error removing from wishlist:', error);  // Log any error that occurs
    res.status(500).json({ message: 'Error removing from wishlist', error: error.message });  // Return error status with the message
  }
};
