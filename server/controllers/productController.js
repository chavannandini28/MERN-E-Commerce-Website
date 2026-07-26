const asyncHandler = require("express-async-handler");
const slugify = require("slugify");

const Product = require("../models/productModel");
const Category = require("../models/categoryModel");
const Brand = require("../models/brandModel");

// ======================================
// Create Product
// ======================================
exports.createProduct = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    shortDescription,
    category,
    brand,
    price,
    stock,
    discountPrice,
    discountPercentage,
    costPrice,
    colors,
    sizes,
    specifications,
    tags,
    shippingCharge,
    freeShipping,
    weight,
    warranty,
    returnPolicy,
    featured,
    status,
  } = req.body;

  if (
    !title ||
    !description ||
    !category ||
    !brand ||
    !price ||
    !stock
  ) {
    return res.status(400).json({
      success: false,
      message: "Please fill all required fields",
    });
  }

  const categoryExists = await Category.findById(category);

  if (!categoryExists) {
    return res.status(404).json({
      success: false,
      message: "Category not found",
    });
  }

  const brandExists = await Brand.findById(brand);

  if (!brandExists) {
    return res.status(404).json({
      success: false,
      message: "Brand not found",
    });
  }

  const productExists = await Product.findOne({
    title,
  });

  if (productExists) {
    return res.status(400).json({
      success: false,
      message: "Product already exists",
    });
  }

  const slug = slugify(title, {
    lower: true,
    strict: true,
  });

  const sku =
    "SKU-" +
    Date.now() +
    "-" +
    Math.floor(Math.random() * 1000);

  const thumbnail = req.files?.thumbnail?.length
    ? {
        public_id: req.files.thumbnail[0].filename,
        url: req.files.thumbnail[0].path,
      }
    : {
        public_id: "",
        url: "",
      };

  const images =
    req.files?.images?.map((img) => ({
      public_id: img.filename,
      url: img.path,
    })) || [];

  const product = await Product.create({
    title,
    slug,
    sku,

    description,
    shortDescription,

    category,
    brand,

    thumbnail,
    images,

    price,
    stock,

    discountPrice,
    discountPercentage,
    costPrice,

    colors,
    sizes,
    specifications,
    tags,

    shippingCharge,
    freeShipping,
    weight,

    warranty,
    returnPolicy,

    featured,
    status,

    createdBy: req.user._id,
  });

  res.status(201).json({
    success: true,
    message: "Product created successfully",
    product,
  });
});

// ======================================
// Get All Products
// ======================================
exports.getProducts = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1;

  const limit = Number(req.query.limit) || 12;

  const keyword = req.query.keyword
    ? {
        title: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  const category = req.query.category
    ? {
        category: req.query.category,
      }
    : {};

  const brand = req.query.brand
    ? {
        brand: req.query.brand,
      }
    : {};

  const filter = {
    ...keyword,
    ...category,
    ...brand,
  };

  const totalProducts =
    await Product.countDocuments(filter);

  const products = await Product.find(filter)
    .populate("category", "name")
    .populate("brand", "name")
    .sort({
      createdAt: -1,
    })
    .skip((page - 1) * limit)
    .limit(limit);

  res.status(200).json({
    success: true,
    page,
    pages: Math.ceil(totalProducts / limit),
    totalProducts,
    products,
  });
});

// ======================================
// Get Product By ID
// ======================================
exports.getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
    .populate("category")
    .populate("brand")
    .populate({
      path: "reviews",
      populate: {
        path: "user",
        select: "name avatar",
      },
    });

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  res.status(200).json({
    success: true,
    product,
  });
});

// ======================================
// Get Product By Slug
// ======================================
exports.getProductBySlug = asyncHandler(async (req, res) => {
  const product = await Product.findOne({
    slug: req.params.slug,
  })
    .populate("category")
    .populate("brand");

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  res.status(200).json({
    success: true,
    product,
  });
});

// ======================================
// Search Products
// ======================================
exports.searchProducts = asyncHandler(async (req, res) => {
  const keyword = req.query.keyword || "";

  const products = await Product.find({
    $or: [
      {
        title: {
          $regex: keyword,
          $options: "i",
        },
      },
      {
        description: {
          $regex: keyword,
          $options: "i",
        },
      },
      {
        tags: {
          $in: [new RegExp(keyword, "i")],
        },
      },
    ],
  })
    .populate("category", "name")
    .populate("brand", "name")
    .sort({
      createdAt: -1,
    });

  res.status(200).json({
    success: true,
    count: products.length,
    products,
  });
});

// ======================================
// Filter Products
// ======================================
exports.filterProducts = asyncHandler(async (req, res) => {
  const {
    category,
    brand,
    minPrice,
    maxPrice,
    featured,
    rating,
    status,
  } = req.query;

  let query = {};

  if (category) {
    query.category = category;
  }

  if (brand) {
    query.brand = brand;
  }

  if (featured) {
    query.featured = featured === "true";
  }

  if (status) {
    query.status = status;
  }

  if (rating) {
    query.rating = {
      $gte: Number(rating),
    };
  }

  if (minPrice || maxPrice) {
    query.price = {};

    if (minPrice) {
      query.price.$gte = Number(minPrice);
    }

    if (maxPrice) {
      query.price.$lte = Number(maxPrice);
    }
  }

  const products = await Product.find(query)
    .populate("category", "name")
    .populate("brand", "name")
    .sort({
      createdAt: -1,
    });

  res.status(200).json({
    success: true,
    count: products.length,
    products,
  });
});

// ======================================
// Featured Products
// ======================================
exports.getFeaturedProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({
    featured: true,
    isActive: true,
  })
    .populate("category", "name")
    .populate("brand", "name")
    .limit(8);

  res.status(200).json({
    success: true,
    products,
  });
});

// ======================================
// Latest Products
// ======================================
exports.getLatestProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({
    isActive: true,
  })
    .populate("category", "name")
    .populate("brand", "name")
    .sort({
      createdAt: -1,
    })
    .limit(10);

  res.status(200).json({
    success: true,
    products,
  });
});

// ======================================
// Related Products
// ======================================
exports.getRelatedProducts = asyncHandler(async (req, res) => {
  const currentProduct = await Product.findById(req.params.id);

  if (!currentProduct) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  const products = await Product.find({
    category: currentProduct.category,
    _id: {
      $ne: currentProduct._id,
    },
  })
    .populate("category", "name")
    .populate("brand", "name")
    .limit(4);

  res.status(200).json({
    success: true,
    products,
  });
});

// ======================================
// Update Product
// ======================================
exports.updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  if (req.body.title) {
    product.title = req.body.title;

    product.slug = slugify(req.body.title, {
      lower: true,
      strict: true,
    });
  }

  product.description =
    req.body.description ?? product.description;

  product.shortDescription =
    req.body.shortDescription ??
    product.shortDescription;

  product.category =
    req.body.category ?? product.category;

  product.brand =
    req.body.brand ?? product.brand;

  product.price =
    req.body.price ?? product.price;

  product.discountPrice =
    req.body.discountPrice ??
    product.discountPrice;

  product.discountPercentage =
    req.body.discountPercentage ??
    product.discountPercentage;

  product.costPrice =
    req.body.costPrice ??
    product.costPrice;

  product.stock =
    req.body.stock ?? product.stock;

  product.status =
    req.body.status ?? product.status;

  product.featured =
    req.body.featured ?? product.featured;

  product.colors =
    req.body.colors ?? product.colors;

  product.sizes =
    req.body.sizes ?? product.sizes;

  product.tags =
    req.body.tags ?? product.tags;

  product.specifications =
    req.body.specifications ??
    product.specifications;

  product.shippingCharge =
    req.body.shippingCharge ??
    product.shippingCharge;

  product.freeShipping =
    req.body.freeShipping ??
    product.freeShipping;

  product.weight =
    req.body.weight ?? product.weight;

  product.warranty =
    req.body.warranty ??
    product.warranty;

  product.returnPolicy =
    req.body.returnPolicy ??
    product.returnPolicy;

  if (req.files?.thumbnail?.length) {
    product.thumbnail = {
      public_id:
        req.files.thumbnail[0].filename,
      url:
        req.files.thumbnail[0].path,
    };
  }

  if (req.files?.images?.length) {
    product.images =
      req.files.images.map((img) => ({
        public_id: img.filename,
        url: img.path,
      }));
  }

  await product.save();

  res.status(200).json({
    success: true,
    message: "Product updated successfully",
    product,
  });
});

// ======================================
// Delete Product
// ======================================
exports.deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  await product.deleteOne();

  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
  });
});

// ======================================
// Update Product Stock
// ======================================
exports.updateProductStock = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  product.stock = req.body.stock;

  if (product.stock <= 0) {
    product.status = "Out of Stock";
  } else {
    product.status = "Published";
  }

  await product.save();

  res.status(200).json({
    success: true,
    message: "Stock updated successfully",
    product,
  });
});

// ======================================
// Upload Product Images
// ======================================
exports.uploadProductImages = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  if (!req.files || req.files.length === 0) {
    return res.status(400).json({
      success: false,
      message: "No images uploaded",
    });
  }

  const images = req.files.map((img) => ({
    public_id: img.filename,
    url: img.path,
  }));

  product.images.push(...images);

  await product.save();

  res.status(200).json({
    success: true,
    message: "Images uploaded successfully",
    images: product.images,
  });
});

// ======================================
// Delete Product Image
// ======================================
exports.deleteProductImage = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  product.images = product.images.filter(
    (img) =>
      img._id.toString() !==
      req.params.imageId
  );

  await product.save();

  res.status(200).json({
    success: true,
    message: "Image deleted successfully",
    images: product.images,
  });

  });
// ======================================
// Low Stock Products
// ======================================
exports.getLowStockProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({
    stock: { $lte: 5 },
    isActive: true,
  })
    .populate("category", "name")
    .populate("brand", "name")
    .sort({ stock: 1 });

  res.status(200).json({
    success: true,
    count: products.length,
    products,
  });
});

// ======================================
// Out Of Stock Products
// ======================================
exports.getOutOfStockProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({
    stock: 0,
  })
    .populate("category", "name")
    .populate("brand", "name");

  res.status(200).json({
    success: true,
    count: products.length,
    products,
  });
});

// ======================================
// Product Statistics
// ======================================
exports.getAdminProductStats = asyncHandler(async (req, res) => {
  const totalProducts = await Product.countDocuments();

  const publishedProducts =
    await Product.countDocuments({
      status: "Published",
    });

  const draftProducts =
    await Product.countDocuments({
      status: "Draft",
    });

  const outOfStock =
    await Product.countDocuments({
      stock: 0,
    });

  const featuredProducts =
    await Product.countDocuments({
      featured: true,
    });

  const totalStock = await Product.aggregate([
    {
      $group: {
        _id: null,
        stock: {
          $sum: "$stock",
        },
      },
    },
  ]);

  res.status(200).json({
    success: true,
    statistics: {
      totalProducts,
      publishedProducts,
      draftProducts,
      outOfStock,
      featuredProducts,
      totalStock:
        totalStock.length > 0
          ? totalStock[0].stock
          : 0,
    },
  });
});

// ======================================
// Bulk Delete Products
// ======================================
exports.bulkDeleteProducts = asyncHandler(async (req, res) => {
  const { ids } = req.body;

  if (!ids || ids.length === 0) {
    return res.status(400).json({
      success: false,
      message: "Please select products",
    });
  }

  await Product.deleteMany({
    _id: {
      $in: ids,
    },
  });

  res.status(200).json({
    success: true,
    message: "Selected products deleted successfully",
  });
});

// ======================================
// Best Selling Products
// ======================================
exports.getBestSellingProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({
    isActive: true,
  })
    .populate("category", "name")
    .populate("brand", "name")
    .sort({
      sold: -1,
    })
    .limit(10);

  res.status(200).json({
    success: true,
    products,
  });
});

// ======================================
// Recent Products
// ======================================
exports.getRecentProducts = asyncHandler(async (req, res) => {
  const products = await Product.find()
    .populate("category", "name")
    .populate("brand", "name")
    .sort({
      createdAt: -1,
    })
    .limit(10);

  res.status(200).json({
    success: true,
    products,
  });
});

