import axiosInstance from "./axiosInstance";

// ===================================
// Get All Brands
// ===================================
export const getBrands = () =>
  axiosInstance.get("/brands");

// ===================================
// Get Single Brand
// ===================================
export const getBrandById = (id) =>
  axiosInstance.get(`/brands/${id}`);

// ===================================
// Create Brand
// ===================================
export const createBrand = (formData) =>
  axiosInstance.post("/brands", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

// ===================================
// Update Brand
// ===================================
export const updateBrand = (id, formData) =>
  axiosInstance.put(`/brands/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

// ===================================
// Delete Brand
// ===================================
export const deleteBrand = (id) =>
  axiosInstance.delete(`/brands/${id}`);