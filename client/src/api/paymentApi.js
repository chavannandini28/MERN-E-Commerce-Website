import axiosInstance from "./axiosInstance";

// Create Razorpay Order
export const createPaymentOrder = (data) => {
  return axiosInstance.post("/orders/payment/create-order", data);
};

// Verify Razorpay Payment
export const verifyPayment = (data) => {
  return axiosInstance.post("/orders/payment/verify", data);
};

// Get Payment Details (Optional)
export const getPaymentDetails = (paymentId) => {
  return axiosInstance.get(`/orders/payment/${paymentId}`);
};