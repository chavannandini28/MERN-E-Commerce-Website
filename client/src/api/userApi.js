import axiosInstance from "./axiosInstance";

// ===============================
// Get Logged-in User Profile
// ===============================

export const getProfile = async () => {
  return axiosInstance.get("/users/profile");
};

// ===============================
// Update Logged-in User Profile
// ===============================

export const updateProfile = async (userData) => {
  return axiosInstance.put(
    "/users/profile",
    userData
  );
};

// ===============================
// Change Password
// ===============================

export const changePassword = async (
  passwordData
) => {
  return axiosInstance.put(
    "/users/change-password",
    passwordData
  );
};

// ===============================
// Upload Avatar
// ===============================

export const uploadAvatar = async (
  formData
) => {
  return axiosInstance.post(
    "/users/avatar",
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
// Get All Users (Admin)
// ===============================

export const getUsers = async () => {
  return axiosInstance.get("/users");
};

// ===============================
// Get User By ID
// ===============================

export const getUserById = async (id) => {
  return axiosInstance.get(
    `/users/${id}`
  );
};

// ===============================
// Update User (Admin)
// ===============================

export const updateUser = async (
  id,
  userData
) => {
  return axiosInstance.put(
    `/users/${id}`,
    userData
  );
};

// ===============================
// Delete User
// ===============================

export const deleteUser = async (id) => {
  return axiosInstance.delete(
    `/users/${id}`
  );
};

// ===============================
// Change User Role
// ===============================

export const updateUserRole = async (
  id,
  role
) => {
  return axiosInstance.patch(
    `/users/${id}/role`,
    { role }
  );
};

// ===============================
// Block / Unblock User
// ===============================

export const toggleUserStatus = async (
  id
) => {
  return axiosInstance.patch(
    `/users/${id}/status`
  );
};