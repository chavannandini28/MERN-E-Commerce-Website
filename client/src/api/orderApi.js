import axiosInstance from "./axiosInstance";

// ======================================
// Create Order
// POST /api/orders
// ======================================

export const createOrder = (orderData) =>
  axiosInstance.post("/orders", orderData);

// ======================================
// Get My Orders
// GET /api/orders/my-orders
// ======================================

export const getMyOrders = () =>
  axiosInstance.get("/orders/my-orders");

// ======================================
// Get Order By ID
// GET /api/orders/:id
// ======================================

export const getOrderById = (id) =>
  axiosInstance.get(`/orders/${id}`);

// ======================================
// Cancel Order
// PATCH /api/orders/:id/cancel
// ======================================

export const cancelOrder = (id, reason) =>
  axiosInstance.patch(`/orders/${id}/cancel`, {
    reason,
  });

// ======================================
// ================= ADMIN =================
// ======================================

// Get All Orders
// GET /api/orders/admin/all
// ======================================

export const getAllOrders = () =>
  axiosInstance.get("/orders/admin/all");

// ======================================
// Update Order Status
// PATCH /api/orders/admin/:id/status
// ======================================

export const updateOrderStatus = (
  id,
  status
) =>
  axiosInstance.patch(
    `/orders/admin/${id}/status`,
    {
      status,
    }
  );

// ======================================
// Delete Order
// DELETE /api/orders/admin/:id
// ======================================

export const deleteOrder = (id) =>
  axiosInstance.delete(
    `/orders/admin/${id}`
  );

// ======================================
// Order Statistics
// GET /api/orders/admin/statistics
// ======================================

export const getOrderStatistics = () =>
  axiosInstance.get(
    "/orders/admin/statistics"
  );

// ======================================
// Revenue Analytics
// GET /api/orders/admin/revenue
// ======================================

export const getRevenueAnalytics = () =>
  axiosInstance.get(
    "/orders/admin/revenue"
  );