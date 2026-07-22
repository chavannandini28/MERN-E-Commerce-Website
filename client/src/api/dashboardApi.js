import axiosInstance from "./axiosInstance";

// ======================================
// Dashboard Statistics
// GET /api/dashboard
// ======================================
export const getDashboardStats = async () => {
  return await axiosInstance.get("/dashboard");
};

// ======================================
// Total Revenue
// GET /api/dashboard/revenue
// ======================================
export const getRevenue = async () => {
  return await axiosInstance.get("/dashboard/revenue");
};

// ======================================
// Sales Analytics
// GET /api/dashboard/sales
// ======================================
export const getSalesAnalytics = async () => {
  return await axiosInstance.get("/dashboard/sales");
};

// ======================================
// Order Analytics
// GET /api/dashboard/orders
// ======================================
export const getOrderAnalytics = async () => {
  return await axiosInstance.get("/dashboard/orders");
};

// ======================================
// Product Analytics
// GET /api/dashboard/products
// ======================================
export const getProductAnalytics = async () => {
  return await axiosInstance.get("/dashboard/products");
};

// ======================================
// User Analytics
// GET /api/dashboard/users
// ======================================
export const getUserAnalytics = async () => {
  return await axiosInstance.get("/dashboard/users");
};

// ======================================
// Recent Orders
// GET /api/dashboard/recent-orders
// ======================================
export const getRecentOrders = async () => {
  return await axiosInstance.get("/dashboard/recent-orders");
};