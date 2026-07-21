import axiosInstance from "./axiosInstance";

export const addWishlist = (data) =>
  axiosInstance.post("/wishlist/addToWishlist", data);

export const getWishlist = () =>
  axiosInstance.get("/wishlist/getMyWishlist");

export const removeWishlist = (id) =>
  axiosInstance.delete(`/wishlist/removeFromWishlist/${id}`);