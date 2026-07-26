import axiosInstance from "./axiosInstance";

export const createOrder = (data) =>
  axiosInstance.post("/payment/create-order", data);

export const verifyPayment = (data) =>
  axiosInstance.post("/payment/verify-payment", data);

export const cashOnDelivery = (data) =>
  axiosInstance.post("/payment/cod", data);