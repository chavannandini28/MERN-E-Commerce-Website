const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema(
  {
    // ===============================
    // Brand Name
    // ===============================
    name: {
      type: String,
      required: [true, "Brand name is required"],
      unique: true,
      trim: true,
      maxlength: 100,
    },

    // ===============================
    // Slug
    // ===============================
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    // ===============================
    // Description
    // ===============================
    description: {
      type: String,
      default: "",
    },

    // ===============================
    // Logo
    // ===============================
    logo: {
      public_id: {
        type: String,
        default: "",
      },
      url: {
        type: String,
        default: "",
      },
    },

    // ===============================
    // Website
    // ===============================
    website: {
      type: String,
      default: "",
    },

    // ===============================
    // Featured Brand
    // ===============================
    featured: {
      type: Boolean,
      default: false,
    },

    // ===============================
    // Active Status
    // ===============================
    isActive: {
      type: Boolean,
      default: true,
    },

    // ===============================
    // Created By
    // ===============================
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

// =====================================
// Indexes
// =====================================

brandSchema.index({
  name: "text",
});

brandSchema.index({
  slug: 1,
});

brandSchema.index({
  featured: 1,
});

// =====================================
// Virtual
// =====================================

brandSchema.virtual("isFeatured").get(function () {
  return this.featured;
});

// =====================================
// Enable Virtuals
// =====================================

brandSchema.set("toJSON", {
  virtuals: true,
});

brandSchema.set("toObject", {
  virtuals: true,
});

module.exports = mongoose.model(
  "Brand",
  brandSchema
);