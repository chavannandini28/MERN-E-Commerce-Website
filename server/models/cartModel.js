const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
      default: 1,
      min: 1,
    },

    price: {
      type: Number,
      required: true,
      default: 0,
    },

    selectedColor: {
      type: String,
      default: "",
    },

    selectedSize: {
      type: String,
      default: "",
    },
  },
  {
    _id: true,
  }
);

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    items: [cartItemSchema],

    totalItems: {
      type: Number,
      default: 0,
    },

    totalQuantity: {
      type: Number,
      default: 0,
    },

    subtotal: {
      type: Number,
      default: 0,
    },

    shippingCharge: {
      type: Number,
      default: 0,
    },

    tax: {
      type: Number,
      default: 0,
    },

    discount: {
      type: Number,
      default: 0,
    },

    totalAmount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// =====================================
// Calculate Cart
// =====================================

cartSchema.methods.calculateTotals = function () {
  this.totalItems = this.items.length;

  this.totalQuantity = this.items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  this.subtotal = this.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  this.tax = Number((this.subtotal * 0.18).toFixed(2));

  this.shippingCharge =
    this.subtotal >= 500 ? 0 : 50;

  this.totalAmount =
    this.subtotal +
    this.tax +
    this.shippingCharge -
    this.discount;
};

module.exports = mongoose.model(
  "Cart",
  cartSchema
);