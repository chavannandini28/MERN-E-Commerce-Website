import axiosInstance from "./axiosInstance";

// ===============================
// Create Razorpay Order
// ===============================

export const createRazorpayOrder = async (
  orderData
) => {
  return axiosInstance.post(
    "/payment/create-order",
    orderData
  );
};

// ===============================
// Verify Razorpay Payment
// ===============================

export const verifyPayment = async (
  paymentData
) => {
  return axiosInstance.post(
    "/payment/verify",
    paymentData
  );
};

// ===============================
// Get Payment Details
// ===============================

export const getPaymentDetails = async (
  paymentId
) => {
  return axiosInstance.get(
    `/payment/${paymentId}`
  );
};

// ===============================
// Get Payment History
// ===============================

export const getPaymentHistory =
  async () => {
    return axiosInstance.get(
      "/payment/history"
    );
  };

// ===============================
// Refund Payment
// ===============================

export const refundPayment = async (
  paymentId,
  refundData
) => {
  return axiosInstance.post(
    `/payment/refund/${paymentId}`,
    refundData
  );
};

// ===============================
// Download Payment Receipt
// ===============================

export const downloadReceipt =
  async (paymentId) => {
    return axiosInstance.get(
      `/payment/receipt/${paymentId}`,
      {
        responseType: "blob",
      }
    );
  };

// ===============================
// Payment Status
// ===============================

export const getPaymentStatus =
  async (paymentId) => {
    return axiosInstance.get(
      `/payment/status/${paymentId}`
    );
  };

// ===============================
// Retry Failed Payment
// ===============================

export const retryPayment =
  async (orderId) => {
    return axiosInstance.post(
      `/payment/retry/${orderId}`
    );
  };

// ===============================
// Cancel Payment
// ===============================

export const cancelPayment =
  async (paymentId) => {
    return axiosInstance.post(
      `/payment/cancel/${paymentId}`
    );
  };

// ===============================
// Payment Statistics (Admin)
// ===============================

export const getPaymentStats =
  async () => {
    return axiosInstance.get(
      "/payment/stats"
    );
  };