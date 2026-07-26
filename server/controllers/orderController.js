const asyncHandler = require("express-async-handler");

const Order = require("../models/orderModel");
const Cart = require("../models/cartModel");
const Product = require("../models/productModel");

// ======================================
// Helper - Update Product Stock
// ======================================

const updateStock = async (items) => {
  for (const item of items) {
    const product = await Product.findById(item.product);

    if (!product) continue;

    product.stock -= item.quantity;
    product.sold += item.quantity;

    if (product.stock < 0) {
      product.stock = 0;
    }

    await product.save();
  }
};

// ======================================
// Create Order
// POST /api/orders
// ======================================

exports.createOrder = asyncHandler(async (req, res) => {
  const {
    shippingAddress,
    paymentMethod,
    paymentInfo,
  } = req.body;

  // Find User Cart
  const cart = await Cart.findOne({
    user: req.user._id,
  }).populate("items.product");

  if (!cart || cart.items.length === 0) {
    return res.status(400).json({
      success: false,
      message: "Cart is empty",
    });
  }

  // Prepare Order Items
  const orderItems = cart.items.map((item) => ({
    product: item.product._id,
    title: item.product.title,
    image:
      item.product.thumbnail?.url ||
      item.product.images?.[0]?.url ||
      "",

    price: item.price,

    quantity: item.quantity,

    selectedColor: item.selectedColor || "",

    selectedSize: item.selectedSize || "",
  }));

  const order = await Order.create({
    user: req.user._id,

    orderItems,

    shippingAddress,

    paymentMethod,

    paymentInfo,

    itemsPrice: cart.subtotal,

    shippingPrice: cart.shippingCharge,

    taxPrice: cart.tax,

    discountPrice: cart.discount,

    totalPrice: cart.totalAmount,

    isPaid:
      paymentMethod === "Cash On Delivery"
        ? false
        : true,

    paidAt:
      paymentMethod === "Cash On Delivery"
        ? null
        : new Date(),
  });

  // Update Product Stock
  await updateStock(orderItems);

  // Clear Cart
  cart.items = [];

  cart.subtotal = 0;
  cart.tax = 0;
  cart.discount = 0;
  cart.shippingCharge = 0;
  cart.totalAmount = 0;

  await cart.save();

  res.status(201).json({
    success: true,
    message: "Order placed successfully",
    order,
  });
});

// ======================================
// Get My Orders
// GET /api/orders/my-orders
// ======================================

exports.getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({
    user: req.user._id,
  })
    .populate("orderItems.product", "title thumbnail price")
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: orders.length,
    orders,
  });
});

// ======================================
// Get Single Order
// GET /api/orders/:id
// ======================================

exports.getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
    .populate(
      "user",
      "name email phone"
    )
    .populate(
      "orderItems.product",
      "title thumbnail price category brand"
    );

  if (!order) {
    return res.status(404).json({
      success: false,
      message: "Order not found",
    });
  }

  // Owner or Admin
  if (
    order.user._id.toString() !== req.user._id.toString() &&
    req.user.role !== "Admin"
  ) {
    return res.status(403).json({
      success: false,
      message: "Access denied",
    });
  }

  res.status(200).json({
    success: true,
    order,
  });
});

// ======================================
// Get All Orders (Admin)
// GET /api/orders/admin/all
// ======================================

exports.getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find()
    .populate(
      "user",
      "name email"
    )
    .populate(
      "orderItems.product",
      "title"
    )
    .sort({
      createdAt: -1,
    });

  const totalRevenue = orders.reduce(
    (sum, order) => sum + order.totalPrice,
    0
  );

  res.status(200).json({
    success: true,
    totalOrders: orders.length,
    totalRevenue,
    orders,
  });
});

// ======================================
// Order Statistics
// GET /api/orders/admin/statistics
// ======================================

exports.getOrderStatistics = asyncHandler(async (req, res) => {
  const totalOrders =
    await Order.countDocuments();

  const pendingOrders =
    await Order.countDocuments({
      orderStatus: "Pending",
    });

  const processingOrders =
    await Order.countDocuments({
      orderStatus: "Processing",
    });

  const shippedOrders =
    await Order.countDocuments({
      orderStatus: "Shipped",
    });

  const deliveredOrders =
    await Order.countDocuments({
      orderStatus: "Delivered",
    });

  const cancelledOrders =
    await Order.countDocuments({
      orderStatus: "Cancelled",
    });

  const orders = await Order.find();

  const totalRevenue = orders.reduce(
    (sum, order) => sum + order.totalPrice,
    0
  );

  res.status(200).json({
    success: true,

    statistics: {
      totalOrders,
      pendingOrders,
      processingOrders,
      shippedOrders,
      deliveredOrders,
      cancelledOrders,
      totalRevenue,
    },
  });
});

// ======================================
// Update Order Status
// PATCH /api/orders/:id/status
// ======================================

exports.updateOrderStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;

  const order = await Order.findById(req.params.id);

  if (!order) {
    return res.status(404).json({
      success: false,
      message: "Order not found",
    });
  }

  if (order.orderStatus === "Delivered") {
    return res.status(400).json({
      success: false,
      message: "Order already delivered",
    });
  }

  if (
    ![
      "Pending",
      "Processing",
      "Packed",
      "Shipped",
      "Delivered",
      "Cancelled",
    ].includes(status)
  ) {
    return res.status(400).json({
      success: false,
      message: "Invalid order status",
    });
  }

  order.orderStatus = status;

  if (status === "Delivered") {
    order.deliveredAt = new Date();

    order.isPaid = true;

    if (!order.paidAt) {
      order.paidAt = new Date();
    }
  }

  await order.save();

  res.status(200).json({
    success: true,
    message: "Order status updated successfully",
    order,
  });
});

// ======================================
// Cancel Order
// PATCH /api/orders/:id/cancel
// ======================================

exports.cancelOrder = asyncHandler(async (req, res) => {
  const { reason } = req.body;

  const order = await Order.findById(req.params.id);

  if (!order) {
    return res.status(404).json({
      success: false,
      message: "Order not found",
    });
  }

  if (
    order.user.toString() !== req.user._id.toString() &&
    req.user.role !== "Admin"
  ) {
    return res.status(403).json({
      success: false,
      message: "Unauthorized",
    });
  }

  if (
    order.orderStatus === "Delivered" ||
    order.orderStatus === "Cancelled"
  ) {
    return res.status(400).json({
      success: false,
      message: `Cannot cancel ${order.orderStatus} order`,
    });
  }

  // Restore Product Stock

  for (const item of order.orderItems) {
    const product = await Product.findById(item.product);

    if (product) {
      product.stock += item.quantity;

      product.sold -= item.quantity;

      if (product.sold < 0) {
        product.sold = 0;
      }

      await product.save();
    }
  }

  order.orderStatus = "Cancelled";
  order.cancelReason = reason || "";
  order.cancelledAt = new Date();

  await order.save();

  res.status(200).json({
    success: true,
    message: "Order cancelled successfully",
    order,
  });
});

// ======================================
// Delete Order
// DELETE /api/orders/:id
// ======================================

exports.deleteOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return res.status(404).json({
      success: false,
      message: "Order not found",
    });
  }

  await order.deleteOne();

  res.status(200).json({
    success: true,
    message: "Order deleted successfully",
  });
});

// ======================================
// Revenue Analytics
// GET /api/orders/admin/revenue
// ======================================

exports.getRevenueAnalytics = asyncHandler(async (req, res) => {
  const orders = await Order.find({
    orderStatus: "Delivered",
  });

  const totalRevenue = orders.reduce(
    (sum, order) => sum + order.totalPrice,
    0
  );

  const averageOrderValue =
    orders.length > 0
      ? totalRevenue / orders.length
      : 0;

  res.status(200).json({
    success: true,
    analytics: {
      totalRevenue,
      totalOrders: orders.length,
      averageOrderValue,
    },
  });
});