import axiosInstance from "./axiosInstance";

// ===============================
// Get All Products
// ===============================

export const getProducts = async (params = {}) => {
  return axiosInstance.get("/products", {
    params,
  });
};

// ===============================
// Get Single Product
// ===============================

export const getProduct = async (id) => {
  return axiosInstance.get(`/products/${id}`);
};

// ===============================
// Get Featured Products
// ===============================

export const getFeaturedProducts = async () => {
  return axiosInstance.get(
    "/products/featured"
  );
};

// ===============================
// Get Related Products
// ===============================

export const getRelatedProducts = async (
  id
) => {
  return axiosInstance.get(
    `/products/${id}/related`
  );
};

// ===============================
// Search Products
// ===============================

export const searchProducts = async (
  keyword
) => {
  return axiosInstance.get(
    `/products/search`,
    {
      params: {
        keyword,
      },
    }
  );
};

// ===============================
// Create Product
// ===============================

export const createProduct = async (
  productData
) => {
  return axiosInstance.post(
    "/products",
    productData
  );
};

// ===============================
// Update Product
// ===============================

export const updateProduct = async (
  id,
  productData
) => {
  return axiosInstance.put(
    `/products/${id}`,
    productData
  );
};

// ===============================
// Delete Product
// ===============================

export const deleteProduct = async (id) => {
  return axiosInstance.delete(
    `/products/${id}`
  );
};

// ===============================
// Upload Product Images
// ===============================

export const uploadProductImages =
  async (formData) => {
    return axiosInstance.post(
      "/products/upload",
      formData,
      {
        headers: {
          "Content-Type":
            "multipart/form-data",
        },
      }
    );
  };

// ===============================
// Update Product Stock
// ===============================

export const updateProductStock =
  async (id, stock) => {
    return axiosInstance.patch(
      `/products/${id}/stock`,
      {
        stock,
      }
    );
  };

// ===============================
// Toggle Featured Product
// ===============================

export const toggleFeaturedProduct =
  async (id) => {
    return axiosInstance.patch(
      `/products/${id}/featured`
    );
  };

// ===============================
// Get Low Stock Products
// ===============================

export const getLowStockProducts =
  async () => {
    return axiosInstance.get(
      "/products/low-stock"
    );
  };