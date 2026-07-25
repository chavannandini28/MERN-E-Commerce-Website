const express = require("express");

const router = express.Router();

const {
  register,
  login,
  logout,
  getProfile,
  updateProfile,
  changePassword,
  forgotPassword,
  resetPassword,
  verifyOTP,
  resendOTP,
} = require("../controllers/authController");

const { protect } = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

// ======================================
// PUBLIC ROUTES
// ======================================

// Register
router.post("/register", register);

// Login
router.post("/login", login);

// Forgot Password
router.post("/forgot-password", forgotPassword);

// Reset Password
router.put("/reset-password/:token", resetPassword);

// Verify OTP
router.post("/verify-otp", verifyOTP);

// Resend OTP
router.post("/resend-otp", resendOTP);

// ======================================
// PRIVATE ROUTES
// ======================================

// Logout
router.post("/logout", protect, logout);

// Get Profile
router.get("/profile", protect, getProfile);

// Alternative Profile Route
router.get("/me", protect, getProfile);

// Update Profile
router.put("/profile", protect, updateProfile);

// Change Password
router.put("/change-password", protect, changePassword);

// ======================================
// ADMIN TEST ROUTE
// ======================================

router.get(
  "/admin",
  protect,
  authorize("Admin"),
  (req, res) => {
    res.status(200).json({
      success: true,
      message: "Welcome Admin",
      user: req.user,
    });
  }
);

module.exports = router;