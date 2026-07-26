import axiosInstance from "./axiosInstance";

// ======================================
// Add To Cart
// POST /api/cart/addToCart
// ======================================
export const addToCart = (cartData) =>
  axiosInstance.post("/cart/addToCart", cartData);

// ======================================
// Get My Cart
// GET /api/cart/getMyCart
// ======================================
export const getMyCart = () =>
  axiosInstance.get("/cart/getMyCart");

// ======================================
// Update Quantity
// PATCH /api/cart/updateQuantity/:id
// ======================================
export const updateQuantity = (id, quantity) =>
  axiosInstance.patch(`/cart/updateQuantity/${id}`, {
    quantity,
  });

// ======================================
// Remove Item
// DELETE /api/cart/removeFromCart/:id
// ======================================
export const removeFromCart = (id) =>
  axiosInstance.delete(`/cart/removeFromCart/${id}`);

// ======================================
// Clear Cart
// DELETE /api/cart/clearCart
// ======================================
export const clearCart = () =>
  axiosInstance.delete("/cart/clearCart");

// ======================================
// Cart Count
// GET /api/cart/getCartCount
// ======================================
export const getCartCount = () =>
  axiosInstance.get("/cart/getCartCount");

// ======================================
// Cart Total
// GET /api/cart/getCartTotal
// ======================================
export const getCartTotal = () =>
  axiosInstance.get("/cart/getCartTotal");

// ======================================
// Default Export
// ======================================
export default {
  addToCart,
  getMyCart,
  updateQuantity,
  removeFromCart,
  clearCart,
  getCartCount,
  getCartTotal,
};