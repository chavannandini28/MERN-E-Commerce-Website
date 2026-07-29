import axiosInstance from "./axiosInstance";

// ===============================
// Add Review
// ===============================

export const addReview = async (productId, reviewData) => {
  return axiosInstance.post(
    `/reviews/${productId}`,
    reviewData
  );
};

// ===============================
// Get Product Reviews
// ===============================

export const getProductReviews = async (productId) => {
  return axiosInstance.get(
    `/reviews/${productId}`
  );
};

// ===============================
// Get All Reviews (Admin)
// ===============================

export const getReviews = async () => {
  return axiosInstance.get("/reviews");
};

// Alias (Required)

export const getAllReviews = getReviews;

// ===============================
// Get Review By ID
// ===============================

export const getReview = async (reviewId) => {
  return axiosInstance.get(
    `/reviews/details/${reviewId}`
  );
};

// ===============================
// Update Review
// ===============================

export const updateReview = async (
  reviewId,
  reviewData
) => {
  return axiosInstance.put(
    `/reviews/${reviewId}`,
    reviewData
  );
};

// ===============================
// Delete Review
// ===============================

export const deleteReview = async (reviewId) => {
  return axiosInstance.delete(
    `/reviews/${reviewId}`
  );
};

// ===============================
// Approve Review
// ===============================

export const approveReview = async (reviewId) => {
  return axiosInstance.patch(
    `/reviews/approve/${reviewId}`
  );
};

// ===============================
// Reject Review
// ===============================

export const rejectReview = async (reviewId) => {
  return axiosInstance.patch(
    `/reviews/reject/${reviewId}`
  );
};

// ===============================
// Report Review
// ===============================

export const reportReview = async (
  reviewId,
  reason
) => {
  return axiosInstance.post(
    `/reviews/report/${reviewId}`,
    { reason }
  );
};

// ===============================
// Like Review
// ===============================

export const likeReview = async (reviewId) => {
  return axiosInstance.patch(
    `/reviews/like/${reviewId}`
  );
};

// ===============================
// Review Statistics
// ===============================

export const getReviewStats = async () => {
  return axiosInstance.get(
    "/reviews/stats"
  );
};