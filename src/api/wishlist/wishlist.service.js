// wishlist.service.js
import Wishlist from './wishlist.model.js';

export const getWishlistByUserId = async (userId) => {
  try {
    const wishlist = await Wishlist.findOne({ userId }).populate('items'); // Populate items if needed
    return wishlist; // Return the fetched wishlist
  } catch (error) {
    console.error('Error fetching wishlist:', error);
    throw new Error('Could not fetch wishlist');
  }
};

export const addItemToWishlist = async (userId, itemId) => {
  try {
    const wishlist = await getWishlistByUserId(userId);
    
    if (!wishlist) {
      const newWishlist = new Wishlist({ userId, items: [itemId] });
      return await newWishlist.save(); // Create and save new wishlist
    }
    
    // Check if item is already in wishlist
    if (!wishlist.items.includes(itemId)) {
      wishlist.items.push(itemId);
      return await wishlist.save(); // Save updated wishlist
    }

    return wishlist; // Item already in wishlist
  } catch (error) {
    console.error('Error adding item to wishlist:', error);
    throw new Error('Could not add item to wishlist');
  }
};

export const removeItemFromWishlist = async (userId, itemId) => {
  try {
    const wishlist = await getWishlistByUserId(userId);
    if (!wishlist) {
      throw new Error('Wishlist not found');
    }

    // Remove item from wishlist
    wishlist.items = wishlist.items.filter(item => item.toString() !== itemId);
    return await wishlist.save(); // Save updated wishlist
  } catch (error) {
    console.error('Error removing item from wishlist:', error);
    throw new Error('Could not remove item from wishlist');
  }
};
