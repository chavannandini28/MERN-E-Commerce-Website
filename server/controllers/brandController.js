const asyncHandler = require("express-async-handler");
const Brand = require("../models/brandModel");

// ======================================
// Create Brand
// ======================================
exports.createBrand = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    website,
    featured,
  } = req.body;

  if (!name) {
    return res.status(400).json({
      success: false,
      message: "Brand name is required",
    });
  }

  const existingBrand = await Brand.findOne({ name });

  if (existingBrand) {
    return res.status(400).json({
      success: false,
      message: "Brand already exists",
    });
  }

  const slug = name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");

  const brand = await Brand.create({
    name,
    slug,
    description,
    website,
    featured,

    logo: {
      public_id: "",
      url: req.file ? req.file.path : "",
    },

    createdBy: req.user._id,
  });

  res.status(201).json({
    success: true,
    message: "Brand created successfully",
    brand,
  });
});

// ======================================
// Get All Brands
// ======================================
exports.getBrands = asyncHandler(async (req, res) => {
  const brands = await Brand.find().sort({
    createdAt: -1,
  });

  res.status(200).json({
    success: true,
    count: brands.length,
    brands,
  });
});

// ======================================
// Get Brand By ID
// ======================================
exports.getBrandById = asyncHandler(async (req, res) => {
  const brand = await Brand.findById(req.params.id);

  if (!brand) {
    return res.status(404).json({
      success: false,
      message: "Brand not found",
    });
  }

  res.status(200).json({
    success: true,
    brand,
  });
});

// ======================================
// Get Brand By Slug
// ======================================
exports.getBrandBySlug = asyncHandler(async (req, res) => {
  const brand = await Brand.findOne({
    slug: req.params.slug,
  });

  if (!brand) {
    return res.status(404).json({
      success: false,
      message: "Brand not found",
    });
  }

  res.status(200).json({
    success: true,
    brand,
  });
});

// ======================================
// Update Brand
// ======================================
exports.updateBrand = asyncHandler(async (req, res) => {
  const brand = await Brand.findById(req.params.id);

  if (!brand) {
    return res.status(404).json({
      success: false,
      message: "Brand not found",
    });
  }

  if (req.body.name) {
    brand.name = req.body.name;

    brand.slug = req.body.name
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");
  }

  brand.description =
    req.body.description || brand.description;

  brand.website =
    req.body.website || brand.website;

  if (req.body.featured !== undefined) {
    brand.featured = req.body.featured;
  }

  if (req.file) {
    brand.logo = {
      public_id: "",
      url: req.file.path,
    };
  }

  await brand.save();

  res.status(200).json({
    success: true,
    message: "Brand updated successfully",
    brand,
  });
});

// ======================================
// Delete Brand
// ======================================
exports.deleteBrand = asyncHandler(async (req, res) => {
  const brand = await Brand.findById(req.params.id);

  if (!brand) {
    return res.status(404).json({
      success: false,
      message: "Brand not found",
    });
  }

  await brand.deleteOne();

  res.status(200).json({
    success: true,
    message: "Brand deleted successfully",
  });
});

// ======================================
// Featured Brands
// ======================================
exports.getFeaturedBrands = asyncHandler(async (req, res) => {
  const brands = await Brand.find({
    featured: true,
    isActive: true,
  });

  res.status(200).json({
    success: true,
    brands,
  });
});

// ======================================
// Search Brands
// ======================================
exports.searchBrands = asyncHandler(async (req, res) => {
  const keyword = req.query.keyword || "";

  const brands = await Brand.find({
    name: {
      $regex: keyword,
      $options: "i",
    },
  });

  res.status(200).json({
    success: true,
    brands,
  });
});

// ======================================
// Toggle Brand Status
// ======================================
exports.toggleBrandStatus = asyncHandler(async (req, res) => {
  const brand = await Brand.findById(req.params.id);

  if (!brand) {
    return res.status(404).json({
      success: false,
      message: "Brand not found",
    });
  }

  brand.isActive = !brand.isActive;

  await brand.save();

  res.status(200).json({
    success: true,
    message: `Brand ${
      brand.isActive ? "Activated" : "Deactivated"
    } Successfully`,
    brand,
  });
});

// ======================================
// Brand Statistics
// ======================================
exports.getBrandStatistics = asyncHandler(async (req, res) => {
  const totalBrands =
    await Brand.countDocuments();

  const activeBrands =
    await Brand.countDocuments({
      isActive: true,
    });

  const featuredBrands =
    await Brand.countDocuments({
      featured: true,
    });

  res.status(200).json({
    success: true,
    statistics: {
      totalBrands,
      activeBrands,
      featuredBrands,
    },
  });
});

// ======================================
// Brand Dropdown
// ======================================
exports.getBrandDropdown = asyncHandler(async (req, res) => {
  const brands = await Brand.find(
    { isActive: true },
    "_id name slug"
  ).sort({
    name: 1,
  });

  res.status(200).json({
    success: true,
    brands,
  });
});