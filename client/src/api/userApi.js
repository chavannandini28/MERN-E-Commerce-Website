import axiosInstance from "./axiosInstance";

export const getUsers = () =>
  axiosInstance.get("/users");

export const deleteUser = (id) =>
  axiosInstance.delete(`/users/${id}`);