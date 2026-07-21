import axiosInstance from "./axiosInstance";

// All Products
export const getProducts = () =>
  axiosInstance.get("/products");

// Single Product
export const getProductById = (id) =>
  axiosInstance.get(`/products/${id}`);

// Search
export const searchProducts = (keyword) =>
  axiosInstance.get(`/products?keyword=${keyword}`);

// Category Filter
export const getCategoryProducts = (id) =>
  axiosInstance.get(`/products/category/${id}`);

// Brand Filter
export const getBrandProducts = (id) =>
  axiosInstance.get(`/products/brand/${id}`);

// ================= Vendor =================

// Get Vendor Products
export const getVendorProducts = () =>
  axiosInstance.get("/products/vendor");

// Add Product
export const createProduct = (data) =>
  axiosInstance.post("/products", data);

// Update Product
export const updateProduct = (id, data) =>
  axiosInstance.put(`/products/${id}`, data);

// Delete Product
export const deleteProduct = (id) =>
  axiosInstance.delete(`/products/${id}`);