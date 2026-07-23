import axiosInstance from "./axiosInstance";

// ===================================
// Create Order
// POST /orders/create
// ===================================
export const createOrder = (data) =>
  axiosInstance.post("/orders/create", data);

// ===================================
// My Orders
// GET /orders/my-orders
// ===================================
export const getMyOrders = () =>
  axiosInstance.get("/orders/my-orders");

// ===================================
// Get Order By Id
// GET /orders/:id
// ===================================
export const getOrderById = (id) =>
  axiosInstance.get(`/orders/${id}`);

// ===================================
// Admin Orders
// GET /orders
// ===================================
export const getOrders = () =>
  axiosInstance.get("/orders");

// ===================================
// Update Status
// PATCH /orders/status/:id
// ===================================
export const updateOrderStatus = (id, data) =>
  axiosInstance.patch(`/orders/status/${id}`, data);

// ===================================
// Cancel Order
// PATCH /orders/cancel/:id
// ===================================
export const cancelOrder = (id) =>
  axiosInstance.patch(`/orders/cancel/${id}`);

// ===================================
// Delete Order
// DELETE /orders/:id
// ===================================
export const deleteOrder = (id) =>
  axiosInstance.delete(`/orders/${id}`);

// ===================================
// Razorpay Create
// POST /orders/payment/create-order
// ===================================
export const createRazorpayOrder = (data) =>
  axiosInstance.post(
    "/orders/payment/create-order",
    data
  );

// ===================================
// Razorpay Verify
// POST /orders/payment/verify
// ===================================
export const verifyPayment = (data) =>
  axiosInstance.post(
    "/orders/payment/verify",
    data
  );