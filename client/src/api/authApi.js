import axios from "axios";


// ======================================
// Axios Instance
// ======================================

const API = axios.create({

  baseURL: "http://localhost:5000/api/auth",

  headers: {
    "Content-Type": "application/json",
  },

});




// ======================================
// Attach JWT Token Automatically
// ======================================

API.interceptors.request.use(

  (config) => {

    const token = localStorage.getItem("token");


    if (token) {

      config.headers.Authorization =
        `Bearer ${token}`;

    }


    return config;

  },


  (error) => {

    return Promise.reject(error);

  }

);





// ======================================
// Register User
// POST /api/auth/register
// ======================================

export const registerUser = (userData) => {

  return API.post(
    "/register",
    userData
  );

};





// ======================================
// Login User
// POST /api/auth/login
// ======================================

export const loginUser = (loginData) => {

  return API.post(
    "/login",
    loginData
  );

};





// ======================================
// Logout User
// POST /api/auth/logout
// ======================================

export const logoutUser = () => {

  return API.post(
    "/logout"
  );

};





// ======================================
// Get Logged User Profile
// GET /api/auth/profile
// ======================================

export const getMyProfile = () => {

  return API.get(
    "/profile"
  );

};





// ======================================
// Update Profile
// PUT /api/auth/profile
// ======================================

export const updateProfile = (userData) => {

  return API.put(
    "/profile",
    userData
  );

};





// ======================================
// Change Password
// PUT /api/auth/change-password
// ======================================

export const changePassword = (passwordData) => {

  return API.put(
    "/change-password",
    passwordData
  );

};





// ======================================
// Forgot Password
// POST /api/auth/forgot-password
// ======================================

export const forgotPassword = (email) => {

  return API.post(
    "/forgot-password",
    email
  );

};





// ======================================
// Reset Password
// POST /api/auth/reset-password/:token
// ======================================

export const resetPassword = (
  token,
  password
) => {

  return API.post(
    `/reset-password/${token}`,
    password
  );

};





// ======================================
// Verify OTP
// POST /api/auth/verify-otp
// ======================================

export const verifyOTP = (data) => {

  return API.post(
    "/verify-otp",
    data
  );

};





// ======================================
// Resend OTP
// POST /api/auth/resend-otp
// ======================================

export const resendOTP = (data) => {

  return API.post(
    "/resend-otp",
    data
  );

};





export default API;