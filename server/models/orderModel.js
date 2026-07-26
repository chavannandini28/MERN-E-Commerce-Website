const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    title: String,

    image: String,

    price: {
      type: Number,
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
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
    _id: false,
  }
);

const shippingSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    city: {
      type: String,
      required: true,
    },

    state: {
      type: String,
      required: true,
    },

    country: {
      type: String,
      default: "India",
    },

    pincode: {
      type: String,
      required: true,
    },
  },
  {
    _id: false,
  }
);

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    orderItems: [orderItemSchema],

    shippingAddress: shippingSchema,

    paymentMethod: {
      type: String,
      enum: ["Cash On Delivery", "Razorpay"],
      default: "Cash On Delivery",
    },

    paymentInfo: {
      orderId: String,
      paymentId: String,
      status: {
        type: String,
        default: "Pending",
      },
    },

    itemsPrice: {
      type: Number,
      default: 0,
    },

    taxPrice: {
      type: Number,
      default: 0,
    },

    shippingPrice: {
      type: Number,
      default: 0,
    },

    discountPrice: {
      type: Number,
      default: 0,
    },

    totalPrice: {
      type: Number,
      required: true,
    },

    orderStatus: {
      type: String,
      enum: [
        "Pending",
        "Processing",
        "Packed",
        "Shipped",
        "Delivered",
        "Cancelled",
      ],
      default: "Pending",
    },

    isPaid: {
      type: Boolean,
      default: false,
    },

    paidAt: Date,

    deliveredAt: Date,

    cancelledAt: Date,

    cancelReason: String,
  },
  {
    timestamps: true,
  }
);

// ===============================
// Indexes
// ===============================

orderSchema.index({ user: 1 });

orderSchema.index({ createdAt: -1 });

orderSchema.index({ orderStatus: 1 });

module.exports = mongoose.model("Order", orderSchema);