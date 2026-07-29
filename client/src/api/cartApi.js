import axiosInstance from "./axiosInstance";

// ===============================
// Add To Cart
// ===============================

export const addToCart = async (productData) => {
  return axiosInstance.post(
    "/cart/addToCart",
    productData
  );
};

// ===============================
// Get My Cart
// ===============================

export const getCart = async () => {
  return axiosInstance.get(
    "/cart/getMyCart"
  );
};

// Alias (Required)

export const getMyCart = getCart;

// ===============================
// Update Cart Quantity
// ===============================

export const updateCartQuantity = async (
  id,
  quantity
) => {
  return axiosInstance.patch(
    `/cart/updateQuantity/${id}`,
    { quantity }
  );
};

// ===============================
// Remove From Cart
// ===============================

export const removeFromCart = async (id) => {
  return axiosInstance.delete(
    `/cart/removeFromCart/${id}`
  );
};

// ===============================
// Clear Cart
// ===============================

export const clearCart = async () => {
  return axiosInstance.delete(
    "/cart/clearCart"
  );
};

// ===============================
// Get Cart Count
// ===============================

export const getCartCount = async () => {
  return axiosInstance.get(
    "/cart/getCartCount"
  );
};

// ===============================
// Get Cart Total
// ===============================

export const getCartTotal = async () => {
  return axiosInstance.get(
    "/cart/getCartTotal"
  );
};

// ===============================
// Apply Coupon
// ===============================

export const applyCartCoupon = async (
  couponCode
) => {
  return axiosInstance.post(
    "/cart/applyCoupon",
    { couponCode }
  );
};

// ===============================
// Remove Coupon
// ===============================

export const removeCartCoupon = async () => {
  return axiosInstance.delete(
    "/cart/removeCoupon"
  );
};

// ===============================
// Move To Wishlist
// ===============================

export const moveToWishlist = async (
  id
) => {
  return axiosInstance.post(
    `/cart/moveToWishlist/${id}`
  );
};