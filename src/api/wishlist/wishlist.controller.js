import * as wishlistService from './wishlist.service.js';

export const getWishlist = async (req, res) => {
  const { userId } = req.params;
  try {
    const wishlist = await wishlistService.getWishlistByUserId(userId);
    res.status(200).json(wishlist);
  } catch (error) {
    console.error('Error fetching wishlist:', error);
    res.status(500).json({ message: 'Error fetching wishlist', error: error.message });
  }
};

export const addToWishlist = async (req, res) => {
  const { userId, itemId } = req.body;
  try {
    const updatedWishlist = await wishlistService.addItemToWishlist(userId, itemId);
    res.status(200).json(updatedWishlist);
  } catch (error) {
    console.error('Error adding to wishlist:', error);
    res.status(500).json({ message: 'Error adding to wishlist', error: error.message });
  }
};

export const removeFromWishlist = async (req, res) => {
  const { userId, itemId } = req.body;
  try {
    const updatedWishlist = await wishlistService.removeItemFromWishlist(userId, itemId);
    res.status(200).json(updatedWishlist);
  } catch (error) {
    console.error('Error removing from wishlist:', error);
    res.status(500).json({ message: 'Error removing from wishlist', error: error.message });
  }
};
