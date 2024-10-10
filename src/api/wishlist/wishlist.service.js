import Wishlist from './wishlist.model.js';

export const getWishlistByUserId = async (userId) => {
  return await Wishlist.findOne({ userId }).populate('items'); // Populate items if needed
};

export const addItemToWishlist = async (userId, itemId) => {
  const wishlist = await getWishlistByUserId(userId);
  if (!wishlist) {
    const newWishlist = new Wishlist({ userId, items: [itemId] });
    return await newWishlist.save();
  }
  
  if (!wishlist.items.includes(itemId)) {
    wishlist.items.push(itemId);
    return await wishlist.save();
  }
  
  return wishlist; // Item already in wishlist
};

export const removeItemFromWishlist = async (userId, itemId) => {
  const wishlist = await getWishlistByUserId(userId);
  if (wishlist) {
    wishlist.items = wishlist.items.filter(item => item.toString() !== itemId);
    return await wishlist.save();
  }
  throw new Error('Wishlist not found');
};
