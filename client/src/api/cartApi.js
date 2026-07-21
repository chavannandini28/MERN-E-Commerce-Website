import axiosInstance from "./axiosInstance";

// ===================================
// Add Product To Cart
// POST /cart/addToCart
// ===================================
export const addToCart = (data) =>
  axiosInstance.post("/cart/addToCart", data);

// ===================================
// Get Logged In User Cart
// GET /cart/getMyCart
// ===================================
export const getMyCart = () =>
  axiosInstance.get("/cart/getMyCart");

// ===================================
// Update Product Quantity
// PATCH /cart/updateQuantity/:id
// ===================================
export const updateCartQuantity = (id, data) =>
  axiosInstance.patch(`/cart/updateQuantity/${id}`, data);

// ===================================
// Remove Product From Cart
// DELETE /cart/removeFromCart/:id
// ===================================
export const removeFromCart = (id) =>
  axiosInstance.delete(`/cart/removeFromCart/${id}`);

// ===================================
// Clear Complete Cart
// DELETE /cart/clearCart
// ===================================
export const clearCart = () =>
  axiosInstance.delete("/cart/clearCart");

// ===================================
// Cart Item Count
// GET /cart/getCartCount
// ===================================
export const getCartCount = () =>
  axiosInstance.get("/cart/getCartCount");

// ===================================
// Cart Total Amount
// GET /cart/getCartTotal
// ===================================
export const getCartTotal = () =>
  axiosInstance.get("/cart/getCartTotal");