import axiosInstance from "./axiosInstance";

// ======================================
// Register
// ======================================

export const register = async (userData) => {
  return axiosInstance.post("/auth/register", userData);
};

// Alias
export const registerUser = register;

// ======================================
// Login
// ======================================

export const login = async (userData) => {
  return axiosInstance.post("/auth/login", userData);
};

// Alias
export const loginUser = login;

// ======================================
// Logout
// ======================================

export const logout = async () => {
  return axiosInstance.post("/auth/logout");
};

// Alias
export const logoutUser = logout;

// ======================================
// Get Profile
// ======================================

export const getProfile = async () => {
  return axiosInstance.get("/auth/profile");
};

// Alias
export const getMyProfile = getProfile;

// ======================================
// Update Profile
// ======================================

export const updateProfile = async (userData) => {
  return axiosInstance.put("/auth/profile", userData);
};

// ======================================
// Change Password
// ======================================

export const changePassword = async (passwordData) => {
  return axiosInstance.put(
    "/auth/change-password",
    passwordData
  );
};

// ======================================
// Forgot Password
// ======================================

export const forgotPassword = async (email) => {
  return axiosInstance.post("/auth/forgot-password", {
    email,
  });
};

// ======================================
// Reset Password
// ======================================

export const resetPassword = async (
  token,
  passwordData
) => {
  return axiosInstance.put(
    `/auth/reset-password/${token}`,
    passwordData
  );
};

// ======================================
// Verify OTP
// ======================================

export const verifyOTP = async (otpData) => {
  return axiosInstance.post("/auth/verify-otp", otpData);
};

// ======================================
// Resend OTP
// ======================================

export const resendOTP = async (email) => {
  return axiosInstance.post("/auth/resend-otp", {
    email,
  });
};