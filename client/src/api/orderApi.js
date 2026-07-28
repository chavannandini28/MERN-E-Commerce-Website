import axiosInstance from "./axiosInstance";

// ===============================
// Create Order
// ===============================

export const createOrder = async (orderData) => {
  return axiosInstance.post(
    "/orders/createOrder",
    orderData
  );
};

// ===============================
// Get My Orders
// ===============================

export const getMyOrders = async () => {
  return axiosInstance.get(
    "/orders/getMyOrders"
  );
};

// ===============================
// Get Order Details
// ===============================

export const getOrderDetails = async (id) => {
  return axiosInstance.get(
    `/orders/getOrder/${id}`
  );
};

// ===============================
// Cancel Order
// ===============================

export const cancelOrder = async (id) => {
  return axiosInstance.patch(
    `/orders/cancelOrder/${id}`
  );
};

// ===============================
// Get All Orders (Admin)
// ===============================

export const getOrders = async () => {
  return axiosInstance.get(
    "/orders/getAllOrders"
  );
};

// ===============================
// Update Order Status (Admin)
// ===============================

export const updateOrderStatus = async (
  id,
  status
) => {
  return axiosInstance.patch(
    `/orders/updateStatus/${id}`,
    { status }
  );
};

// ===============================
// Delete Order
// ===============================

export const deleteOrder = async (id) => {
  return axiosInstance.delete(
    `/orders/deleteOrder/${id}`
  );
};

// ===============================
// Download Invoice
// ===============================

export const downloadInvoice = async (
  id
) => {
  return axiosInstance.get(
    `/orders/invoice/${id}`,
    {
      responseType: "blob",
    }
  );
};

// ===============================
// Order Statistics
// ===============================

export const getOrderStats = async () => {
  return axiosInstance.get(
    "/orders/stats"
  );
};

// ===============================
// Track Order
// ===============================

export const trackOrder = async (id) => {
  return axiosInstance.get(
    `/orders/track/${id}`
  );
};

// ===============================
// Verify Payment
// ===============================

export const verifyPayment = async (
  paymentData
) => {
  return axiosInstance.post(
    "/orders/verifyPayment",
    paymentData
  );
};