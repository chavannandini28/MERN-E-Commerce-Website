import axiosInstance from "./axiosInstance";

export const addToCart = (data) =>
  axiosInstance.post("/cart/addToCart", data);

export const getMyCart = () =>
  axiosInstance.get("/cart/getMyCart");

export const updateQuantity = (id, quantity) =>
  axiosInstance.patch(`/cart/updateQuantity/${id}`, {
    quantity,
  });

export const removeCartItem = (id) =>
  axiosInstance.delete(`/cart/removeFromCart/${id}`);

export const clearCart = () =>
  axiosInstance.delete("/cart/clearCart");

export const getCartCount = () =>
  axiosInstance.get("/cart/getCartCount");

export const getCartTotal = () =>
  axiosInstance.get("/cart/getCartTotal");