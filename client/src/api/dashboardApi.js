import axiosInstance from "./axiosInstance";

// =============================
// Dashboard Statistics
// =============================

export const getDashboardStats = async () => {
  return axiosInstance.get("/dashboard/stats");
};

// =============================
// Revenue Analytics
// =============================

export const getRevenueAnalytics = async () => {
  return axiosInstance.get("/dashboard/revenue");
};

// =============================
// Monthly Sales
// =============================

export const getMonthlySales = async () => {
  return axiosInstance.get("/dashboard/monthly-sales");
};

// =============================
// Recent Orders
// =============================

export const getRecentOrders = async () => {
  return axiosInstance.get("/dashboard/recent-orders");
};

// =============================
// Top Products
// =============================

export const getTopProducts = async () => {
  return axiosInstance.get("/dashboard/top-products");
};

// =============================
// Top Customers
// =============================

export const getTopCustomers = async () => {
  return axiosInstance.get("/dashboard/top-customers");
};

// =============================
// Low Stock Products
// =============================

export const getLowStockProducts = async () => {
  return axiosInstance.get("/dashboard/low-stock");
};