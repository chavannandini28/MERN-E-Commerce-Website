import axiosInstance from "./axiosInstance";

// ==========================
// Authentication APIs
// ==========================

// Register
export const registerUser = (userData) =>
  axiosInstance.post("/auth/register", userData);

// Login
export const loginUser = (userData) =>
  axiosInstance.post("/auth/login", userData);

// Logout (Frontend Only)
export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

// ==========================
// User Profile
// ==========================

// Get Logged In User
export const getMyProfile = () =>
  axiosInstance.get("/users/profile");

// Update Profile
export const updateProfile = (userData) =>
  axiosInstance.put("/users/profile", userData);

// Change Password
export const changePassword = (passwordData) =>
  axiosInstance.put("/users/change-password", passwordData);

// ==========================
// Password Recovery
// ==========================

// Forgot Password
export const forgotPassword = (email) =>
  axiosInstance.post("/auth/forgot-password", {
    email,
  });

// Reset Password
export const resetPassword = (token, password) =>
  axiosInstance.post(`/auth/reset-password/${token}`, {
    password,
  });