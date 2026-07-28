import axiosInstance from "./axiosInstance";

// =============================
// Get All Coupons
// =============================

export const getCoupons = async () => {
  return axiosInstance.get("/coupons");
};

// =============================
// Get Single Coupon
// =============================

export const getCoupon = async (id) => {
  return axiosInstance.get(`/coupons/${id}`);
};

// =============================
// Create Coupon
// =============================

export const createCoupon = async (data) => {
  return axiosInstance.post("/coupons", data);
};

// =============================
// Update Coupon
// =============================

export const updateCoupon = async (id, data) => {
  return axiosInstance.put(
    `/coupons/${id}`,
    data
  );
};

// =============================
// Delete Coupon
// =============================

export const deleteCoupon = async (id) => {
  return axiosInstance.delete(
    `/coupons/${id}`
  );
};

// =============================
// Apply Coupon
// =============================

export const applyCoupon = async (code) => {
  return axiosInstance.post(
    "/coupons/apply",
    { code }
  );
};

// =============================
// Validate Coupon
// =============================

export const validateCoupon = async (code) => {
  return axiosInstance.post(
    "/coupons/validate",
    { code }
  );
};

// =============================
// Coupon Statistics
// =============================

export const getCouponStats = async () => {
  return axiosInstance.get(
    "/coupons/stats"
  );
};