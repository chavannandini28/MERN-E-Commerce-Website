import axiosInstance from "./axiosInstance";

// ===============================
// Register User
// ===============================

export const registerUser = async (userData) => {
  return axiosInstance.post("/auth/register", userData);
};

// ===============================
// Login User
// ===============================

export const loginUser = async (credentials) => {
  return axiosInstance.post("/auth/login", credentials);
};

// ===============================
// Logout User
// ===============================

export const logoutUser = async () => {
  return axiosInstance.post("/auth/logout");
};

// ===============================
// Get Logged-in User
// ===============================

export const getCurrentUser = async () => {
  return axiosInstance.get("/auth/me");
};

// ===============================
// Update Profile
// ===============================

export const updateProfile = async (userData) => {
  return axiosInstance.put("/auth/profile", userData);
};

// ===============================
// Change Password
// ===============================

export const changePassword = async (passwordData) => {
  return axiosInstance.put(
    "/auth/change-password",
    passwordData
  );
};

// ===============================
// Forgot Password
// ===============================

export const forgotPassword = async (email) => {
  return axiosInstance.post(
    "/auth/forgot-password",
    { email }
  );
};

// ===============================
// Reset Password
// ===============================

export const resetPassword = async (
  token,
  passwordData
) => {
  return axiosInstance.put(
    `/auth/reset-password/${token}`,
    passwordData
  );
};

// ===============================
// Verify Email
// ===============================

export const verifyEmail = async (token) => {
  return axiosInstance.get(
    `/auth/verify-email/${token}`
  );
};

// ===============================
// Refresh Token
// ===============================

export const refreshToken = async () => {
  return axiosInstance.post("/auth/refresh-token");
};