import axiosInstance from "./axiosInstance";

// ======================================
// Get All Products
// GET /api/products
// ======================================
export const getProducts = () =>
  axiosInstance.get("/products");

// ======================================
// Get Product By ID
// GET /api/products/:id
// ======================================
export const getProductById = (id) =>
  axiosInstance.get(`/products/${id}`);

// ======================================
// Search Products
// GET /api/products/search
// ======================================
export const searchProducts = (keyword) =>
  axiosInstance.get("/products/search", {
    params: { keyword },
  });

// ======================================
// Filter Products
// GET /api/products/filter
// ======================================
export const filterProducts = (params) =>
  axiosInstance.get("/products/filter", {
    params,
  });

// ======================================
// Featured Products
// GET /api/products/featured
// ======================================
export const getFeaturedProducts = () =>
  axiosInstance.get("/products/featured");

// ======================================
// Latest Products
// GET /api/products/latest
// ======================================
export const getLatestProducts = () =>
  axiosInstance.get("/products/latest");

// ======================================
// Related Products
// GET /api/products/related/:id
// ======================================
export const getRelatedProducts = (id) =>
  axiosInstance.get(`/products/related/${id}`);

// ======================================
// Get Product By Slug
// GET /api/products/slug/:slug
// ======================================
export const getProductBySlug = (slug) =>
  axiosInstance.get(`/products/slug/${slug}`);

// ======================================
// Create Product
// POST /api/products
// ======================================
export const createProduct = (formData) =>
  axiosInstance.post("/products", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

// ======================================
// Update Product
// PUT /api/products/:id
// ======================================
export const updateProduct = (id, formData) =>
  axiosInstance.put(`/products/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

// ======================================
// Delete Product
// DELETE /api/products/:id
// ======================================
export const deleteProduct = (id) =>
  axiosInstance.delete(`/products/${id}`);

// ======================================
// Update Product Stock
// PATCH /api/products/stock/:id
// ======================================
export const updateProductStock = (id, stock) =>
  axiosInstance.patch(`/products/stock/${id}`, {
    stock,
  });

// ======================================
// Upload Product Images
// POST /api/products/:id/images
// ======================================
export const uploadProductImages = (id, formData) =>
  axiosInstance.post(`/products/${id}/images`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

// ======================================
// Delete Product Image
// DELETE /api/products/:id/images/:imageId
// ======================================
export const deleteProductImage = (id, imageId) =>
  axiosInstance.delete(`/products/${id}/images/${imageId}`);

// ======================================
// Low Stock Products
// GET /api/products/admin/low-stock
// ======================================
export const getLowStockProducts = () =>
  axiosInstance.get("/products/admin/low-stock");

// ======================================
// Out Of Stock Products
// GET /api/products/admin/out-of-stock
// ======================================
export const getOutOfStockProducts = () =>
  axiosInstance.get("/products/admin/out-of-stock");

// ======================================
// Product Statistics
// GET /api/products/admin/statistics
// ======================================
export const getProductStatistics = () =>
  axiosInstance.get("/products/admin/statistics");

// ======================================
// Bulk Delete Products
// DELETE /api/products/admin/bulk-delete
// ======================================
export const bulkDeleteProducts = (ids) =>
  axiosInstance.delete("/products/admin/bulk-delete", {
    data: { ids },
  });