const express = require("express");

const router = express.Router();

const {
  addToCart,
  getMyCart,
  updateQuantity,
  removeFromCart,
  clearCart,
  getCartCount,
  getCartTotal,
} = require("../controllers/cartController");

const {
  protect,
} = require("../middleware/authMiddleware");

// ======================================
// All Cart Routes Require Login
// ======================================

router.use(protect);

// ======================================
// Add Product To Cart
// POST /api/cart/addToCart
// ======================================

router.post(
  "/addToCart",
  addToCart
);

// ======================================
// Get Logged User Cart
// GET /api/cart/getMyCart
// ======================================

router.get(
  "/getMyCart",
  getMyCart
);

// ======================================
// Update Quantity
// PATCH /api/cart/updateQuantity/:id
// ======================================

router.patch(
  "/updateQuantity/:id",
  updateQuantity
);

// ======================================
// Remove Cart Item
// DELETE /api/cart/removeFromCart/:id
// ======================================

router.delete(
  "/removeFromCart/:id",
  removeFromCart
);

// ======================================
// Clear Cart
// DELETE /api/cart/clearCart
// ======================================

router.delete(
  "/clearCart",
  clearCart
);

// ======================================
// Cart Count
// GET /api/cart/getCartCount
// ======================================

router.get(
  "/getCartCount",
  getCartCount
);

// ======================================
// Cart Total
// GET /api/cart/getCartTotal
// ======================================

router.get(
  "/getCartTotal",
  getCartTotal
);

module.exports = router;