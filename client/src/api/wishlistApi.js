import axiosInstance from "./axiosInstance";

// ===================================
// Add Product To Wishlist
// POST /wishlist/addToWishlist
// ===================================
export const addToWishlist = (data) =>
  axiosInstance.post("/wishlist/addToWishlist", data);

// ===================================
// Get Logged In User Wishlist
// GET /wishlist/getMyWishlist
// ===================================
export const getMyWishlist = () =>
  axiosInstance.get("/wishlist/getMyWishlist");

// ===================================
// Remove Product From Wishlist
// DELETE /wishlist/removeFromWishlist/:id
// ===================================
export const removeFromWishlist = (id) =>
  axiosInstance.delete(`/wishlist/removeFromWishlist/${id}`);

// ===================================
// Clear Wishlist
// DELETE /wishlist/clearWishlist
// ===================================
export const clearWishlist = () =>
  axiosInstance.delete("/wishlist/clearWishlist");