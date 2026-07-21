import axiosInstance from "./axiosInstance";

// ===================================
// Get All Brands
// GET /brands
// ===================================
export const getBrands = () =>
  axiosInstance.get("/brands");

// ===================================
// Get Single Brand
// GET /brands/:id
// ===================================
export const getBrandById = (id) =>
  axiosInstance.get(`/brands/${id}`);

// ===================================
// Create Brand
// POST /brands
// ===================================
export const createBrand = (data) =>
  axiosInstance.post("/brands", data);

// ===================================
// Update Brand
// PUT /brands/:id
// ===================================
export const updateBrand = (id, data) =>
  axiosInstance.put(`/brands/${id}`, data);

// ===================================
// Delete Brand
// DELETE /brands/:id
// ===================================
export const deleteBrand = (id) =>
  axiosInstance.delete(`/brands/${id}`);