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
export const getProductReviews = (productId) =>
  axiosInstance.get(`/reviews/product/${productId}`);

// ===================================
// Get Single Review
// GET /reviews/:id
// ===================================
export const getReviewById = (id) =>
  axiosInstance.get(`/reviews/${id}`);

// ===================================
// Create Review
// POST /reviews
// ===================================
export const createReview = (reviewData) =>
  axiosInstance.post("/reviews", reviewData);

// ===================================
// Update Review
// PUT /reviews/:id
// ===================================
export const updateReview = (id, reviewData) =>
  axiosInstance.put(`/reviews/${id}`, reviewData);

// ===================================
// Delete Review
// DELETE /reviews/:id
// ===================================
export const deleteReview = (id) =>
  axiosInstance.delete(`/reviews/${id}`);

// ===================================
// Like Review (Optional)
// PATCH /reviews/like/:id
// ===================================
export const likeReview = (id) =>
  axiosInstance.patch(`/reviews/like/${id}`);

// ===================================
// Unlike Review (Optional)
// PATCH /reviews/unlike/:id
// ===================================
export const unlikeReview = (id) =>
  axiosInstance.patch(`/reviews/unlike/${id}`);