import mongoose from 'mongoose';  // Import mongoose to handle ObjectIds
import User from '../users/users.model.js';  // Import user model
import Clothes from '../clothes/clothes.model.js';  // Import clothes model

// Function to get the wishlist by userId
export const getWishlistByUserId = async (userId) => {
    try {
      // Find the user by their ID and populate the wishlist with items
      const user = await User.findById(userId).populate({
        path: 'wishList', // Populate the wishList field
        model: 'Clothes' // Specify the model to populate
      });
  
      if (!user) {
        throw new Error('User not found');  // Throw an error if the user does not exist
      }
  
      return user.wishList;  // Return the populated wishlist
    } catch (error) {
      console.error('Error fetching wishlist:', error);  // Log any error
      throw new Error('Could not fetch wishlist');  // Throw a descriptive error
    }
  };

// Function to add an item to the wishlist
export const addItemToWishlist = async (userId, itemId) => {
  try {
    console.log(`User ID: ${userId}, Item ID: ${itemId}`);  // Log the IDs for debugging

    // Fetch the user by their ID
    const user = await User.findById(userId);
    if (!user) {
      console.log(`User with ID ${userId} does not exist.`);
      throw new Error('User not found');  // Throw an error if the user is not found
    }

    // Check if the item exists in the Clothes collection
    const item = await Clothes.findById(itemId);
    if (!item) {
      console.log(`Item with ID ${itemId} does not exist.`);
      throw new Error('Item not found');  // Throw an error if the item is not found
    }

    // Check if the item is already in the user's wishlist
    const itemExistsInWishlist = user.wishList.some(
      (wishItemId) => wishItemId.toString() === itemId.toString()  // Compare item IDs
    );

    if (!itemExistsInWishlist) {
      // If the item is not in the wishlist, add it
      user.wishList.push(itemId);
      const updatedUser = await user.save();  // Save the updated user document
      console.log(`Wishlist updated for user:`, updatedUser);
      return updatedUser.wishList;  // Return the updated wishlist
    }

    console.log(`Item already in wishlist: ${itemId}`);
    return user.wishList;  // Return the wishlist unchanged if the item is already present
  } catch (error) {
    console.error('Error adding item to wishlist:', error.message);  // Log the error
    throw new Error('Could not add item to wishlist');  // Throw a descriptive error for failure cases
  }
};

// Function to remove an item from the wishlist
export const removeItemFromWishlist = async (userId, itemId) => {
  try {
    // Fetch the user by their ID
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');  // Throw an error if the user does not exist
    }

    // Remove the item from the wishlist
    user.wishList = user.wishList.filter(wishItemId => wishItemId.toString() !== itemId);

    const updatedUser = await user.save();  // Save the updated user document
    return updatedUser.wishList;  // Return the updated wishlist
  } catch (error) {
    console.error('Error removing item from wishlist:', error.message);  // Log the error
    throw new Error('Could not remove item from wishlist');  // Throw an error in case of failure
  }
};
