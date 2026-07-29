const asyncHandler = require("express-async-handler");
const Razorpay = require("razorpay");
const crypto = require("crypto");

const Order = require("../models/orderModel");
const Cart = require("../models/cartModel");

// ======================================
// Razorpay Instance
// ======================================

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// ======================================
// Create Razorpay Order
// POST /api/payment/create-order
// ======================================

exports.createRazorpayOrder = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({
    user: req.user._id,
  });

  if (!cart || cart.items.length === 0) {
    return res.status(400).json({
      success: false,
      message: "Cart is empty",
    });
  }

  const options = {
    amount: Math.round(cart.totalAmount * 100),
    currency: "INR",
    receipt: `receipt_${Date.now()}`,
  };

  const razorpayOrder = await razorpay.orders.create(options);

  res.status(200).json({
    success: true,
    order: razorpayOrder,
  });
});

// ======================================
// Verify Payment
// POST /api/payment/verify
// ======================================

exports.verifyPayment = asyncHandler(async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    shippingAddress,
  } = req.body;

  const generatedSignature = crypto
    .createHmac(
      "sha256",
      process.env.RAZORPAY_KEY_SECRET
    )
    .update(
      `${razorpay_order_id}|${razorpay_payment_id}`
    )
    .digest("hex");

  if (generatedSignature !== razorpay_signature) {
    return res.status(400).json({
      success: false,
      message: "Payment verification failed",
    });
  }

  const cart = await Cart.findOne({
    user: req.user._id,
  }).populate("items.product");

  if (!cart) {
    return res.status(404).json({
      success: false,
      message: "Cart not found",
    });
  }

  const order = await Order.create({
    user: req.user._id,

    orderItems: cart.items.map((item) => ({
      product: item.product._id,
      quantity: item.quantity,
      price: item.price,
      selectedColor: item.selectedColor,
      selectedSize: item.selectedSize,
    })),

    shippingAddress,

    itemsPrice: cart.subtotal,
    taxPrice: cart.tax,
    shippingPrice: cart.shippingCharge,
    totalPrice: cart.totalAmount,

    paymentMethod: "Razorpay",

    paymentInfo: {
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      status: "Paid",
    },

    isPaid: true,
    paidAt: new Date(),
  });

  cart.items = [];
  await cart.save();

  res.status(200).json({
    success: true,
    message: "Payment successful",
    order,
  });
});

// ======================================
// Cash On Delivery
// POST /api/payment/cod
// ======================================

exports.cashOnDelivery = asyncHandler(async (req, res) => {
  const { shippingAddress } = req.body;

  const cart = await Cart.findOne({
    user: req.user._id,
  }).populate("items.product");

  if (!cart || cart.items.length === 0) {
    return res.status(400).json({
      success: false,
      message: "Cart is empty",
    });
  }

  const order = await Order.create({
    user: req.user._id,

    orderItems: cart.items.map((item) => ({
      product: item.product._id,
      quantity: item.quantity,
      price: item.price,
      selectedColor: item.selectedColor,
      selectedSize: item.selectedSize,
    })),

    shippingAddress,

    itemsPrice: cart.subtotal,
    taxPrice: cart.tax,
    shippingPrice: cart.shippingCharge,
    totalPrice: cart.totalAmount,

    paymentMethod: "Cash On Delivery",

    isPaid: false,
  });

  cart.items = [];
  await cart.save();

  res.status(201).json({
    success: true,
    message: "Order placed successfully",
    order,
  });
});

// ======================================
// Get Payment Details
// GET /api/payment/:id
// ======================================

exports.getPaymentDetails = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return res.status(404).json({
      success: false,
      message: "Order not found",
    });
  }

  res.status(200).json({
    success: true,
    payment: order.paymentInfo,
    order,
  });
});

// ======================================
// Refund Payment
// POST /api/payment/refund/:id
// ======================================

exports.refundPayment = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return res.status(404).json({
      success: false,
      message: "Order not found",
    });
  }

  order.paymentInfo = {
    ...order.paymentInfo,
    status: "Refunded",
  };

  order.isPaid = false;

  await order.save();

  res.status(200).json({
    success: true,
    message: "Payment refunded successfully",
    order,
  });
});