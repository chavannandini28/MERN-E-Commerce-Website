const asyncHandler = require("express-async-handler");

const Cart = require("../models/cartModel");
const Product = require("../models/productModel");

// ======================================
// Add To Cart
// ======================================
exports.addToCart = asyncHandler(async (req, res) => {
  const {
    productId,
    quantity,
    selectedColor,
    selectedSize,
  } = req.body;

  const product = await Product.findById(productId);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  let cart = await Cart.findOne({
    user: req.user._id,
  });

  if (!cart) {
    cart = await Cart.create({
      user: req.user._id,
      items: [],
    });
  }

  const existingItem = cart.items.find(
    (item) =>
      item.product.toString() === productId &&
      item.selectedColor === (selectedColor || "") &&
      item.selectedSize === (selectedSize || "")
  );

  if (existingItem) {
    existingItem.quantity += Number(quantity || 1);
  } else {
    cart.items.push({
      product: product._id,
      quantity: Number(quantity || 1),
      price: product.discountPrice || product.price,
      selectedColor: selectedColor || "",
      selectedSize: selectedSize || "",
    });
  }

  cart.calculateTotals();

  await cart.save();

  res.status(200).json({
    success: true,
    message: "Product added to cart",
    cart,
  });
});

// ======================================
// Get My Cart
// ======================================
exports.getMyCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({
    user: req.user._id,
  }).populate({
    path: "items.product",
    populate: [
      {
        path: "brand",
      },
      {
        path: "category",
      },
    ],
  });

  if (!cart) {
    return res.status(200).json({
      success: true,
      cart: {
        items: [],
        subtotal: 0,
        totalAmount: 0,
        totalItems: 0,
        totalQuantity: 0,
      },
    });
  }

  res.status(200).json({
    success: true,
    cart,
  });
});

// ======================================
// Update Quantity
// ======================================
exports.updateQuantity = asyncHandler(async (req, res) => {
  const { quantity } = req.body;

  const cart = await Cart.findOne({
    user: req.user._id,
  });

  if (!cart) {
    return res.status(404).json({
      success: false,
      message: "Cart not found",
    });
  }

  const item = cart.items.id(req.params.id);

  if (!item) {
    return res.status(404).json({
      success: false,
      message: "Cart item not found",
    });
  }

  item.quantity = Number(quantity);

  cart.calculateTotals();

  await cart.save();

  res.status(200).json({
    success: true,
    message: "Quantity updated",
    cart,
  });
});

// ======================================
// Remove Item
// ======================================
exports.removeFromCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({
    user: req.user._id,
  });

  if (!cart) {
    return res.status(404).json({
      success: false,
      message: "Cart not found",
    });
  }

  cart.items = cart.items.filter(
    (item) => item._id.toString() !== req.params.id
  );

  cart.calculateTotals();

  await cart.save();

  res.status(200).json({
    success: true,
    message: "Item removed successfully",
    cart,
  });
});

// ======================================
// Clear Cart
// ======================================
exports.clearCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({
    user: req.user._id,
  });

  if (!cart) {
    return res.status(404).json({
      success: false,
      message: "Cart not found",
    });
  }

  cart.items = [];

  cart.calculateTotals();

  await cart.save();

  res.status(200).json({
    success: true,
    message: "Cart cleared successfully",
  });
});

// ======================================
// Cart Count
// ======================================
exports.getCartCount = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({
    user: req.user._id,
  });

  res.status(200).json({
    success: true,
    count: cart ? cart.totalQuantity : 0,
  });
});

// ======================================
// Cart Total
// ======================================
exports.getCartTotal = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({
    user: req.user._id,
  });

  res.status(200).json({
    success: true,
    subtotal: cart ? cart.subtotal : 0,
    tax: cart ? cart.tax : 0,
    shippingCharge: cart ? cart.shippingCharge : 0,
    discount: cart ? cart.discount : 0,
    totalAmount: cart ? cart.totalAmount : 0,
  });
});