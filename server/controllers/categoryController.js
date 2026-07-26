const asyncHandler = require("express-async-handler");
const slugify = require("slugify");

const Category = require("../models/categoryModel");
const Product = require("../models/productModel");

// ======================================
// Create Category
// ======================================
exports.createCategory = asyncHandler(async (req, res) => {
  const { name, description, featured } = req.body;

  if (!name) {
    return res.status(400).json({
      success: false,
      message: "Category name is required",
    });
  }

  const exists = await Category.findOne({ name });

  if (exists) {
    return res.status(400).json({
      success: false,
      message: "Category already exists",
    });
  }

  const category = await Category.create({
    name,
    slug: slugify(name, {
      lower: true,
      strict: true,
    }),
    description,
    featured,

    image: {
      public_id: req.file?.filename || "",
      url: req.file?.path || "",
    },
  });

  res.status(201).json({
    success: true,
    message: "Category created successfully",
    category,
  });
});

// ======================================
// Get All Categories
// ======================================
exports.getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find()
    .sort({ name: 1 });

  res.status(200).json({
    success: true,
    count: categories.length,
    categories,
  });
});

// ======================================
// Get Category By ID
// ======================================
exports.getCategoryById = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    return res.status(404).json({
      success: false,
      message: "Category not found",
    });
  }

  res.status(200).json({
    success: true,
    category,
  });
});

// ======================================
// Get Category By Slug
// ======================================
exports.getCategoryBySlug = asyncHandler(async (req, res) => {
  const category = await Category.findOne({
    slug: req.params.slug,
  });

  if (!category) {
    return res.status(404).json({
      success: false,
      message: "Category not found",
    });
  }

  res.status(200).json({
    success: true,
    category,
  });
});

// ======================================
// Update Category
// ======================================
exports.updateCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    return res.status(404).json({
      success: false,
      message: "Category not found",
    });
  }

  if (req.body.name) {
    category.name = req.body.name;

    category.slug = slugify(req.body.name, {
      lower: true,
      strict: true,
    });
  }

  category.description =
    req.body.description ?? category.description;

  category.featured =
    req.body.featured ?? category.featured;

  category.isActive =
    req.body.isActive ?? category.isActive;

  if (req.file) {
    category.image = {
      public_id: req.file.filename,
      url: req.file.path,
    };
  }

  await category.save();

  res.status(200).json({
    success: true,
    message: "Category updated successfully",
    category,
  });
});

// ======================================
// Delete Category
// ======================================
exports.deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    return res.status(404).json({
      success: false,
      message: "Category not found",
    });
  }

  const totalProducts = await Product.countDocuments({
    category: category._id,
  });

  if (totalProducts > 0) {
    return res.status(400).json({
      success: false,
      message:
        "Category contains products. Delete products first.",
    });
  }

  await category.deleteOne();

  res.status(200).json({
    success: true,
    message: "Category deleted successfully",
  });
});

// ======================================
// Featured Categories
// ======================================
exports.getFeaturedCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({
    featured: true,
    isActive: true,
  }).sort({ name: 1 });

  res.status(200).json({
    success: true,
    count: categories.length,
    categories,
  });
});

// ======================================
// Search Categories
// ======================================
exports.searchCategories = asyncHandler(async (req, res) => {
  const keyword = req.query.keyword || "";

  const categories = await Category.find({
    name: {
      $regex: keyword,
      $options: "i",
    },
  });

  res.status(200).json({
    success: true,
    count: categories.length,
    categories,
  });
});

// ======================================
// Activate / Deactivate Category
// ======================================
exports.toggleCategoryStatus = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    return res.status(404).json({
      success: false,
      message: "Category not found",
    });
  }

  category.isActive = !category.isActive;

  await category.save();

  res.status(200).json({
    success: true,
    message: `Category ${
      category.isActive ? "Activated" : "Deactivated"
    } Successfully`,
    category,
  });
});

// ======================================
// Category Statistics
// ======================================
exports.getCategoryStatistics = asyncHandler(async (req, res) => {
  const totalCategories =
    await Category.countDocuments();

  const activeCategories =
    await Category.countDocuments({
      isActive: true,
    });

  const featuredCategories =
    await Category.countDocuments({
      featured: true,
    });

  res.status(200).json({
    success: true,
    statistics: {
      totalCategories,
      activeCategories,
      featuredCategories,
    },
  });
});

// ======================================
// Categories Dropdown
// ======================================
exports.getCategoryDropdown = asyncHandler(async (req, res) => {
  const categories = await Category.find(
    { isActive: true },
    "_id name slug"
  ).sort({ name: 1 });

  res.status(200).json({
    success: true,
    categories,
  });
});