import axiosInstance from "./axiosInstance";

// ======================================
// Register
// ======================================
export const registerUser = async (userData) => {
  const { data } = await axiosInstance.post(
    "/auth/register",
    userData
  );

  return data;
};

// ======================================
// Login
// ======================================
export const loginUser = async (loginData) => {
  const { data } = await axiosInstance.post(
    "/auth/login",
    loginData
  );

  if (data.token) {
    localStorage.setItem("token", data.token);
  }

  if (data.user) {
    localStorage.setItem(
      "user",
      JSON.stringify(data.user)
    );
  }

  return data;
};

// ======================================
// Logout
// ======================================
export const logoutUser = async () => {
  const { data } = await axiosInstance.post(
    "/auth/logout"
  );

  localStorage.removeItem("token");
  localStorage.removeItem("user");

  return data;
};

// ======================================
// Get Profile
// ======================================
export const getMyProfile = async () => {
  const { data } = await axiosInstance.get(
    "/auth/profile"
  );

  return data;
};

// ======================================
// Update Profile
// ======================================
export const updateProfile = async (userData) => {
  const { data } = await axiosInstance.put(
    "/auth/profile",
    userData
  );

  return data;
};

// ======================================
// Change Password
// ======================================
export const changePassword = async (passwordData) => {
  const { data } = await axiosInstance.put(
    "/auth/change-password",
    passwordData
  );

  return data;
};

// ======================================
// Forgot Password
// ======================================
export const forgotPassword = async (email) => {
  const { data } = await axiosInstance.post(
    "/auth/forgot-password",
    { email }
  );

  return data;
};

// ======================================
// Reset Password
// ======================================
export const resetPassword = async (
  token,
  passwordData
) => {
  const { data } = await axiosInstance.put(
    `/auth/reset-password/${token}`,
    passwordData
  );

  return data;
};

// ======================================
// Verify OTP
// ======================================
export const verifyOTP = async (otpData) => {
  const { data } = await axiosInstance.post(
    "/auth/verify-otp",
    otpData
  );

  return data;
};

// ======================================
// Resend OTP
// ======================================
export const resendOTP = async (emailData) => {
  const { data } = await axiosInstance.post(
    "/auth/resend-otp",
    emailData
  );

  return data;
};