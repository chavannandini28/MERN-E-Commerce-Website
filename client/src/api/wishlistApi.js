import axiosInstance from "./axiosInstance";

// ======================================
// Get Wishlist
// ======================================

export const getWishlist = async () => {
  return axiosInstance.get("/wishlist");
};

// Alias
export const getMyWishlist = getWishlist;

// ======================================
// Add To Wishlist
// ======================================

export const addToWishlist = async (productId) => {
  return axiosInstance.post("/wishlist/add", {
    productId,
  });
};

// ======================================
// Remove From Wishlist
// ======================================

export const removeFromWishlist = async (id) => {
  return axiosInstance.delete(
    `/wishlist/remove/${id}`
  );
};

// ======================================
// Clear Wishlist
// ======================================

export const clearWishlist = async () => {
  return axiosInstance.delete("/wishlist/clear");
};

// ======================================
// Move To Cart
// ======================================

export const moveToCart = async (id) => {
  return axiosInstance.post(
    `/wishlist/move-to-cart/${id}`
  );
};

// ======================================
// Wishlist Count
// ======================================

export const getWishlistCount = async () => {
  return axiosInstance.get(
    "/wishlist/count"
  );
};