import axiosInstance from "./axiosInstance";

// ===============================
// Get All Brands
// ===============================

export const getBrands = async () => {
  return axiosInstance.get("/brands");
};

// ===============================
// Get Single Brand
// ===============================

export const getBrand = async (id) => {
  return axiosInstance.get(`/brands/${id}`);
};

// ===============================
// Create Brand
// ===============================

export const createBrand = async (brandData) => {
  return axiosInstance.post(
    "/brands",
    brandData
  );
};

// ===============================
// Update Brand
// ===============================

export const updateBrand = async (
  id,
  brandData
) => {
  return axiosInstance.put(
    `/brands/${id}`,
    brandData
  );
};

// ===============================
// Delete Brand
// ===============================

export const deleteBrand = async (id) => {
  return axiosInstance.delete(
    `/brands/${id}`
  );
};

// ===============================
// Get Brand Products
// ===============================

export const getBrandProducts = async (
  slug
) => {
  return axiosInstance.get(
    `/brands/${slug}/products`
  );
};

// ===============================
// Upload Brand Logo
// ===============================

export const uploadBrandLogo =
  async (formData) => {
    return axiosInstance.post(
      "/brands/upload",
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
// Brand Statistics
// ===============================

export const getBrandStats = async () => {
  return axiosInstance.get(
    "/brands/stats"
  );
};

// ===============================
// Toggle Brand Status
// ===============================

export const toggleBrandStatus =
  async (id) => {
    return axiosInstance.patch(
      `/brands/${id}/status`
    );
  };

// ===============================
// Featured Brands
// ===============================

export const getFeaturedBrands =
  async () => {
    return axiosInstance.get(
      "/brands/featured"
    );
  };