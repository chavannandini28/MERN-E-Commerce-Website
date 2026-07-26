import axiosInstance from "./axiosInstance";

// ======================================
// Get All Brands
// GET /api/brands
// ======================================
export const getBrands = () =>
  axiosInstance.get("/brands");

// ======================================
// Get Brand By ID
// GET /api/brands/:id
// ======================================
export const getBrandById = (id) =>
  axiosInstance.get(`/brands/${id}`);

// ======================================
// Get Brand By Slug
// GET /api/brands/slug/:slug
// ======================================
export const getBrandBySlug = (slug) =>
  axiosInstance.get(`/brands/slug/${slug}`);

// ======================================
// Featured Brands
// GET /api/brands/featured
// ======================================
export const getFeaturedBrands = () =>
  axiosInstance.get("/brands/featured");

// ======================================
// Search Brands
// GET /api/brands/search
// ======================================
export const searchBrands = (keyword) =>
  axiosInstance.get("/brands/search", {
    params: { keyword },
  });

// ======================================
// Brand Dropdown
// GET /api/brands/dropdown
// ======================================
export const getBrandDropdown = () =>
  axiosInstance.get("/brands/dropdown");

// ======================================
// Create Brand
// POST /api/brands
// ======================================
export const createBrand = (formData) =>
  axiosInstance.post("/brands", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

// ======================================
// Update Brand
// PUT /api/brands/:id
// ======================================
export const updateBrand = (id, formData) =>
  axiosInstance.put(`/brands/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

// ======================================
// Delete Brand
// DELETE /api/brands/:id
// ======================================
export const deleteBrand = (id) =>
  axiosInstance.delete(`/brands/${id}`);

// ======================================
// Toggle Brand Status
// PATCH /api/brands/status/:id
// ======================================
export const toggleBrandStatus = (id) =>
  axiosInstance.patch(`/brands/status/${id}`);

// ======================================
// Brand Statistics
// GET /api/brands/admin/statistics
// ======================================
export const getBrandStatistics = () =>
  axiosInstance.get("/brands/admin/statistics");

export default {
  getBrands,
  getBrandById,
  getBrandBySlug,
  getFeaturedBrands,
  searchBrands,
  getBrandDropdown,
  createBrand,
  updateBrand,
  deleteBrand,
  toggleBrandStatus,
  getBrandStatistics,
};