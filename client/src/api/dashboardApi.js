import axiosInstance from "./axiosInstance";

export const getAdminDashboard = () =>
  axiosInstance.get("/dashboard/admin");

export const getVendorDashboard = () =>
  axiosInstance.get("/dashboard/vendor");

export const getCustomerDashboard = () =>
  axiosInstance.get("/dashboard/customer");

export const getMonthlySales = () =>
  axiosInstance.get("/dashboard/monthly-sales");

export const getTopProducts = () =>
  axiosInstance.get("/dashboard/top-products");

export const getRecentOrders = () =>
  axiosInstance.get("/dashboard/recent-orders");

export const getRevenue = () =>
  axiosInstance.get("/dashboard/revenue");