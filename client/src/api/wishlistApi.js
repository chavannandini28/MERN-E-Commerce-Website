import axiosInstance from "./axiosInstance";

// ===============================
// Add Product to Wishlist
// ===============================

export const addToWishlist = async (productId) => {
  return axiosInstance.post(
    "/wishlist/addToWishlist",
    { productId }
  );
};

// ===============================
// Get My Wishlist
// ===============================

export const getWishlist = async () => {
  return axiosInstance.get(
    "/wishlist/getMyWishlist"
  );
};

// ===============================
// Remove Product From Wishlist
// ===============================

export const removeFromWishlist = async (
  id
) => {
  return axiosInstance.delete(
    `/wishlist/removeFromWishlist/${id}`
  );
};

// ===============================
// Clear Wishlist
// ===============================

export const clearWishlist = async () => {
  return axiosInstance.delete(
    "/wishlist/clearWishlist"
  );
};

// ===============================
// Move Wishlist Item To Cart
// ===============================

export const moveToCart = async (id) => {
  return axiosInstance.post(
    `/wishlist/moveToCart/${id}`
  );
};

// ===============================
// Wishlist Count
// ===============================

export const getWishlistCount =
  async () => {
    return axiosInstance.get(
      "/wishlist/getWishlistCount"
    );
  };

// ===============================
// Check Wishlist Status
// ===============================

export const checkWishlistItem =
  async (productId) => {
    return axiosInstance.get(
      `/wishlist/check/${productId}`
    );
  };

// ===============================
// Toggle Wishlist
// ===============================

export const toggleWishlist = async (
  productId
) => {
  return axiosInstance.post(
    "/wishlist/toggle",
    { productId }
  );
};