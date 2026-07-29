import axiosInstance from "./axiosInstance";

// ======================================
// Cash On Delivery
// ======================================

export const cashOnDelivery = async (orderData) => {
  return axiosInstance.post(
    "/payment/cash-on-delivery",
    orderData
  );
};

// ======================================
// Create Razorpay Order
// ======================================

export const createRazorpayOrder = async (orderData) => {
  return axiosInstance.post(
    "/payment/create-order",
    orderData
  );
};

// Alias for existing components
export const createOrder = createRazorpayOrder;

// ======================================
// Verify Payment
// ======================================

export const verifyPayment = async (paymentData) => {
  return axiosInstance.post(
    "/payment/verify",
    paymentData
  );
};

// ======================================
// Get Payment Details
// ======================================

export const getPaymentDetails = async (paymentId) => {
  return axiosInstance.get(
    `/payment/${paymentId}`
  );
};

// ======================================
// Payment History
// ======================================

export const getPaymentHistory = async () => {
  return axiosInstance.get(
    "/payment/history"
  );
};

// ======================================
// Payment Status
// ======================================

export const getPaymentStatus = async (paymentId) => {
  return axiosInstance.get(
    `/payment/status/${paymentId}`
  );
};

// ======================================
// Refund Payment
// ======================================

export const refundPayment = async (
  paymentId,
  refundData
) => {
  return axiosInstance.post(
    `/payment/refund/${paymentId}`,
    refundData
  );
};

// ======================================
// Retry Payment
// ======================================

export const retryPayment = async (orderId) => {
  return axiosInstance.post(
    `/payment/retry/${orderId}`
  );
};

// ======================================
// Cancel Payment
// ======================================

export const cancelPayment = async (paymentId) => {
  return axiosInstance.post(
    `/payment/cancel/${paymentId}`
  );
};

// ======================================
// Download Receipt
// ======================================

export const downloadReceipt = async (
  paymentId
) => {
  return axiosInstance.get(
    `/payment/receipt/${paymentId}`,
    {
      responseType: "blob",
    }
  );
};

// ======================================
// Payment Statistics
// ======================================

export const getPaymentStats = async () => {
  return axiosInstance.get(
    "/payment/stats"
  );
};