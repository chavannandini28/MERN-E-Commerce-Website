import { v2 as cloudinary } from "cloudinary";

const cloudinaryDelete = async (publicId) => {
  try {
    if (!publicId) return null;

    const result = await cloudinary.uploader.destroy(
      publicId
    );

    return result;
  } catch (error) {
    console.error(
      "Cloudinary Delete Error:",
      error.message
    );
    throw error;
  }
};

export default cloudinaryDelete;