import axiosInstance from "./axiosInstance";

// ==============================
// Get All Users
// GET /api/users
// ==============================
export const getUsers = () =>
  axiosInstance.get("/users");

// ==============================
// Get Single User
// GET /api/users/:id
// ==============================
export const getUserById = (id) =>
  axiosInstance.get(`/users/${id}`);

// ==============================
// Update User
// PUT /api/users/:id
// ==============================
export const updateUser = (id, userData) =>
  axiosInstance.put(`/users/${id}`, userData);

// ==============================
// Delete User
// DELETE /api/users/:id
// ==============================
export const deleteUser = (id) =>
  axiosInstance.delete(`/users/${id}`);

// ==============================
// Block User
// PATCH /api/users/block/:id
// ==============================
export const blockUser = (id) =>
  axiosInstance.patch(`/users/block/${id}`);

// ==============================
// Unblock User
// PATCH /api/users/unblock/:id
// ==============================
export const unblockUser = (id) =>
  axiosInstance.patch(`/users/unblock/${id}`);

// ==============================
// Update User Role
// PATCH /api/users/role/:id
// ==============================
export const updateUserRole = (id, role) =>
  axiosInstance.patch(`/users/role/${id}`, {
    role,
  });

// ==============================
// Get My Profile
// GET /api/users/profile
// ==============================
export const getProfile = () =>
  axiosInstance.get("/users/profile");

// ==============================
// Update My Profile
// PUT /api/users/profile
// ==============================
export const updateProfile = (userData) =>
  axiosInstance.put("/users/profile", userData);