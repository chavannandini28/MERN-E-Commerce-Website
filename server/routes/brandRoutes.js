const express = require("express");

const router = express.Router();

const {
  createBrand,
  getBrands,
  getBrandById,
  getBrandBySlug,
  updateBrand,
  deleteBrand,
  getFeaturedBrands,
  searchBrands,
  toggleBrandStatus,
  getBrandStatistics,
  getBrandDropdown,
} = require("../controllers/brandController");

const { protect } = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");
const upload = require("../middleware/uploadMiddleware");

const {
  brandValidation,
} = require("../middleware/validationMiddleware");

// ======================================
// Public Routes
// ======================================

// Get All Brands
router.get("/", getBrands);

// Featured Brands
router.get("/featured", getFeaturedBrands);

// Search Brands
router.get("/search", searchBrands);

// Brand Dropdown
router.get("/dropdown", getBrandDropdown);

// Brand By Slug
router.get("/slug/:slug", getBrandBySlug);

// Brand By ID
router.get("/:id", getBrandById);

// ======================================
// Admin Routes
// ======================================

// Create Brand
router.post(
  "/",
  protect,
  authorize("Admin"),
  upload.single("logo"),
  brandValidation,
  createBrand
);

// Update Brand
router.put(
  "/:id",
  protect,
  authorize("Admin"),
  upload.single("logo"),
  brandValidation,
  updateBrand
);

// Delete Brand
router.delete(
  "/:id",
  protect,
  authorize("Admin"),
  deleteBrand
);

// Activate / Deactivate Brand
router.patch(
  "/status/:id",
  protect,
  authorize("Admin"),
  toggleBrandStatus
);

// Brand Statistics
router.get(
  "/admin/statistics",
  protect,
  authorize("Admin"),
  getBrandStatistics
);

module.exports = router;