import axiosInstance from "./axiosInstance";

// ===================================
// Create New Order
// POST /orders
// ===================================
export const createOrder = (orderData) =>
  axiosInstance.post("/orders", orderData);

// ===================================
// Get Logged In User Orders
// GET /orders/my-orders
// ===================================
export const getMyOrders = () =>
  axiosInstance.get("/orders/my-orders");

// ===================================
// Get Single Order
// GET /orders/:id
// ===================================
export const getOrderById = (id) =>
  axiosInstance.get(`/orders/${id}`);

// ===================================
// Admin - Get All Orders
// GET /orders
// ===================================
export const getOrders = () =>
  axiosInstance.get("/orders");

// ===================================
// Admin - Update Order Status
// PUT /orders/:id
// ===================================
export const updateOrderStatus = (id, data) =>
  axiosInstance.put(`/orders/${id}`, data);

// ===================================
// Cancel Order
// PUT /orders/cancel/:id
// ===================================
export const cancelOrder = (id) =>
  axiosInstance.put(`/orders/cancel/${id}`);

// ===================================
// Razorpay - Create Order
// POST /payment/create-order
// ===================================
export const createRazorpayOrder = (data) =>
  axiosInstance.post("/payment/create-order", data);

// ===================================
// Razorpay - Verify Payment
// POST /payment/verify
// ===================================
export const verifyPayment = (paymentData) =>
  axiosInstance.post("/payment/verify", paymentData);