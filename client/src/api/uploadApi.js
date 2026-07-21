import axiosInstance from "./axiosInstance";

// ===================================
// Upload Single Image
// POST /upload/single
// ===================================
export const uploadSingleImage = (file) => {
  const formData = new FormData();

  formData.append("image", file);

  return axiosInstance.post(
    "/upload/single",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};

// ===================================
// Upload Multiple Images
// POST /upload/multiple
// ===================================
export const uploadMultipleImages = (files) => {
  const formData = new FormData();

  Array.from(files).forEach((file) => {
    formData.append("images", file);
  });

  return axiosInstance.post(
    "/upload/multiple",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};

// ===================================
// Delete Uploaded Image
// DELETE /upload/:publicId
// ===================================
export const deleteImage = (publicId) =>
  axiosInstance.delete(`/upload/${publicId}`);