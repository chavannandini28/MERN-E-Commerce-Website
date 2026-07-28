import axiosInstance from "./axiosInstance";

// =============================
// Get Store Settings
// =============================

export const getStoreSettings = async () => {
  return axiosInstance.get("/settings");
};

// =============================
// Update Store Settings
// =============================

export const updateStoreSettings = async (data) => {
  return axiosInstance.put("/settings", data);
};

// =============================
// Upload Store Logo
// =============================

export const uploadStoreLogo = async (formData) => {
  return axiosInstance.post(
    "/settings/logo",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};

// =============================
// Payment Settings
// =============================

export const getPaymentSettings = async () => {
  return axiosInstance.get(
    "/settings/payment"
  );
};

export const updatePaymentSettings = async (
  data
) => {
  return axiosInstance.put(
    "/settings/payment",
    data
  );
};

// =============================
// Shipping Settings
// =============================

export const getShippingSettings = async () => {
  return axiosInstance.get(
    "/settings/shipping"
  );
};

export const updateShippingSettings = async (
  data
) => {
  return axiosInstance.put(
    "/settings/shipping",
    data
  );
};

// =============================
// Tax Settings
// =============================

export const getTaxSettings = async () => {
  return axiosInstance.get("/settings/tax");
};

export const updateTaxSettings = async (
  data
) => {
  return axiosInstance.put(
    "/settings/tax",
    data
  );
};