import axiosInstance from "./axiosInstance";

// Customer
export const createOrder = (data) =>
  axiosInstance.post("/orders/create", data);

export const getMyOrders = () =>
  axiosInstance.get("/orders/my-orders");

export const getOrderById = (id) =>
  axiosInstance.get(`/orders/${id}`);

export const cancelOrder = (id) =>
  axiosInstance.patch(`/orders/cancel/${id}`);

// Admin
export const getAllOrders = () =>
  axiosInstance.get("/orders");

export const updateOrderStatus = (id, status) =>
  axiosInstance.patch(`/orders/status/${id}`, {
    status,
  });

export const deleteOrder = (id) =>
  axiosInstance.delete(`/orders/${id}`);