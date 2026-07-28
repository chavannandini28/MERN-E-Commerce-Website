import axiosInstance from "./axiosInstance";

// ===============================
// Get All Categories
// ===============================

export const getCategories = async () => {
  return axiosInstance.get("/categories");
};

// ===============================
// Get Category By ID
// ===============================

export const getCategory = async (id) => {
  return axiosInstance.get(`/categories/${id}`);
};

// ===============================
// Create Category
// ===============================

export const createCategory = async (categoryData) => {
  return axiosInstance.post(
    "/categories",
    categoryData
  );
};

// ===============================
// Update Category
// ===============================

export const updateCategory = async (
  id,
  categoryData
) => {
  return axiosInstance.put(
    `/categories/${id}`,
    categoryData
  );
};

// ===============================
// Delete Category
// ===============================

export const deleteCategory = async (id) => {
  return axiosInstance.delete(
    `/categories/${id}`
  );
};

// ===============================
// Get Category Products
// ===============================

export const getCategoryProducts = async (
  slug
) => {
  return axiosInstance.get(
    `/categories/${slug}/products`
  );
};

// ===============================
// Category Statistics
// ===============================

export const getCategoryStats = async () => {
  return axiosInstance.get(
    "/categories/stats"
  );
};

// ===============================
// Upload Category Image
// ===============================

export const uploadCategoryImage =
  async (formData) => {
    return axiosInstance.post(
      "/categories/upload",
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
// Toggle Category Status
// ===============================

export const toggleCategoryStatus =
  async (id) => {
    return axiosInstance.patch(
      `/categories/${id}/status`
    );
  };