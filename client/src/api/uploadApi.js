import axiosInstance from "./axiosInstance";

// ===============================
// Upload Single Image
// ===============================

export const uploadImage = async (formData) => {
  return axiosInstance.post(
    "/upload/image",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};

// ===============================
// Upload Multiple Images
// ===============================

export const uploadImages = async (formData) => {
  return axiosInstance.post(
    "/upload/images",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};

// ===============================
// Upload Avatar
// ===============================

export const uploadAvatar = async (formData) => {
  return axiosInstance.post(
    "/upload/avatar",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};

// ===============================
// Upload Product Images
// ===============================

export const uploadProductImages = async (
  formData
) => {
  return axiosInstance.post(
    "/upload/product",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};

// ===============================
// Upload Category Image
// ===============================

export const uploadCategoryImage = async (
  formData
) => {
  return axiosInstance.post(
    "/upload/category",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};

// ===============================
// Upload Brand Logo
// ===============================

export const uploadBrandLogo = async (
  formData
) => {
  return axiosInstance.post(
    "/upload/brand",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};

// ===============================
// Delete Uploaded Image
// ===============================

export const deleteImage = async (
  publicId
) => {
  return axiosInstance.delete(
    `/upload/${publicId}`
  );
};

// ===============================
// Get Upload Details
// ===============================

export const getUpload = async (
  uploadId
) => {
  return axiosInstance.get(
    `/upload/${uploadId}`
  );
};

// ===============================
// Delete Multiple Images
// ===============================

export const deleteImages = async (
  publicIds
) => {
  return axiosInstance.post(
    "/upload/delete-multiple",
    {
      publicIds,
    }
  );
};