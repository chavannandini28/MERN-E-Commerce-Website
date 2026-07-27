const express = require("express");
const router = express.Router();

const {
  createOrder,
  getMyOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
  cancelOrder,
  deleteOrder,
  getOrderStatistics,
  getRevenueAnalytics,
} = require("../controllers/orderController");

const { protect } = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

// ======================================
// Customer Routes
// ======================================

// Create Order
router.post(
  "/",
  protect,
  createOrder
);

// My Orders
router.get(
  "/my-orders",
  protect,
  getMyOrders
);

// Order Details
router.get(
  "/:id",
  protect,
  getOrderById
);

// Cancel Order
router.patch(
  "/:id/cancel",
  protect,
  cancelOrder
);

// ======================================
// Admin Routes
// ======================================

// All Orders
router.get(
  "/admin/all",
  protect,
  authorize("Admin"),
  getAllOrders
);

// Statistics
router.get(
  "/admin/statistics",
  protect,
  authorize("Admin"),
  getOrderStatistics
);

// Revenue Analytics
router.get(
  "/admin/revenue",
  protect,
  authorize("Admin"),
  getRevenueAnalytics
);

// Update Status
router.patch(
  "/admin/:id/status",
  protect,
  authorize("Admin"),
  updateOrderStatus
);

// Delete Order
router.delete(
  "/admin/:id",
  protect,
  authorize("Admin"),
  deleteOrder
);

module.exports = router;