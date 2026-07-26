const express = require("express");

const router = express.Router();

const {
  createCategory,
  getCategories,
  getCategoryById,
  getCategoryBySlug,
  updateCategory,
  deleteCategory,
  getFeaturedCategories,
  searchCategories,
  toggleCategoryStatus,
  getCategoryStatistics,
  getCategoryDropdown,
} = require("../controllers/categoryController");

const { protect } = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");
const upload = require("../middleware/uploadMiddleware");

const {
  categoryValidation,
} = require("../middleware/validationMiddleware");

// ======================================
// Public Routes
// ======================================

// Get All Categories
router.get("/", getCategories);

// Featured Categories
router.get("/featured", getFeaturedCategories);

// Search Categories
router.get("/search", searchCategories);

// Dropdown Categories
router.get("/dropdown", getCategoryDropdown);

// Category By Slug
router.get("/slug/:slug", getCategoryBySlug);

// Category By ID
router.get("/:id", getCategoryById);

// ======================================
// Admin Routes
// ======================================

// Create Category
router.post(
  "/",
  protect,
  authorize("Admin"),
  upload.single("image"),
  categoryValidation,
  createCategory
);

// Update Category
router.put(
  "/:id",
  protect,
  authorize("Admin"),
  upload.single("image"),
  categoryValidation,
  updateCategory
);

// Delete Category
router.delete(
  "/:id",
  protect,
  authorize("Admin"),
  deleteCategory
);

// Activate / Deactivate Category
router.patch(
  "/status/:id",
  protect,
  authorize("Admin"),
  toggleCategoryStatus
);

// Category Statistics
router.get(
  "/admin/statistics",
  protect,
  authorize("Admin"),
  getCategoryStatistics
);

module.exports = router;