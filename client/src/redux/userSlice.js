import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";


import {
  getMyProfile,
  updateProfile,
  changePassword,
} from "../api/authApi";
// ======================================
// Get Profile
// ======================================
export const fetchProfile = createAsyncThunk(
  "user/fetchProfile",
  async (_, thunkAPI) => {
    try {
      const { data } = await getMyProfile();

      return data.user || data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Failed to load profile"
      );
    }
  }
);

// ======================================
// Update Profile
// ======================================
export const updateUserProfile =
  createAsyncThunk(
    "user/updateProfile",
    async (userData, thunkAPI) => {
      try {
        const { data } =
          await updateProfile(userData);

        localStorage.setItem(
          "user",
          JSON.stringify(data.user)
        );

        return data.user || data;
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.message ||
            "Failed to update profile"
        );
      }
    }
  );

// ======================================
// Change Password
// ======================================
export const updatePassword =
  createAsyncThunk(
    "user/changePassword",
    async (passwordData, thunkAPI) => {
      try {
        const { data } =
          await changePassword(passwordData);

        return data;
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.message ||
            "Failed to change password"
        );
      }
    }
  );

// ======================================
// Initial State
// ======================================
const initialState = {
  profile: null,
  loading: false,
  success: false,
  error: null,
};

// ======================================
// Slice
// ======================================
const userSlice = createSlice({
  name: "user",

  initialState,

  reducers: {
    clearUserState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },

  extraReducers: (builder) => {
    builder

      // Fetch Profile
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })

      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Profile
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.profile = action.payload;
      })

      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Change Password
      .addCase(updatePassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(updatePassword.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })

      .addCase(updatePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  clearUserState,
} = userSlice.actions;

export default userSlice.reducer;