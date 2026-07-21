import axiosInstance from "./axiosInstance";

// ===================================
// Get All Reviews (Admin)
// GET /reviews
// ===================================
export const getReviews = () =>
  axiosInstance.get("/reviews");

// ===================================
// Get Reviews By Product
// GET /reviews/product/:id
// ===================================
export const getProductReviews = (id) =>
  axiosInstance.get(`/reviews/product/${id}`);

// ===================================
// Create Review
// POST /reviews
// ===================================
export const createReview = (data) =>
  axiosInstance.post("/reviews", data);

// ===================================
// Update Review
// PUT /reviews/:id
// ===================================
export const updateReview = (id, data) =>
  axiosInstance.put(`/reviews/${id}`, data);

// ===================================
// Delete Review
// DELETE /reviews/:id
// ===================================
export const deleteReview = (id) =>
  axiosInstance.delete(`/reviews/${id}`);