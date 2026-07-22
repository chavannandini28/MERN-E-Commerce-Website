import axiosInstance from "./axiosInstance";

// ===================================
// Get All Categories
// GET /categories
// ===================================
export const getCategories = () =>
  axiosInstance.get("/categories");

// ===================================
// Get Single Category
// GET /categories/:id
// ===================================
export const getCategoryById = (id) =>
  axiosInstance.get(`/categories/${id}`);

// ===================================
// Create Category
// POST /categories
// ===================================
export const createCategory = (formData) =>
  axiosInstance.post("/categories", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

// ===================================
// Update Category
// PUT /categories/:id
// ===================================
export const updateCategory = (id, formData) =>
  axiosInstance.put(`/categories/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

// ===================================
// Delete Category
// DELETE /categories/:id
// ===================================
export const deleteCategory = (id) =>
  axiosInstance.delete(`/categories/${id}`);