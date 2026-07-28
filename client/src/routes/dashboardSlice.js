import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  getDashboardStats,
} from "../api/dashboardApi";

// ===============================
// Fetch Dashboard Statistics
// ===============================

export const fetchDashboardStats =
  createAsyncThunk(
    "dashboard/fetchDashboardStats",
    async (_, thunkAPI) => {
      try {

        const { data } =
          await getDashboardStats();

        return data;

      } catch (error) {

        return thunkAPI.rejectWithValue(
          error.response?.data?.message ||
            "Failed to load dashboard"
        );

      }
    }
  );

// ===============================
// Initial State
// ===============================

const initialState = {

  stats: {

    users: 0,

    products: 0,

    orders: 0,

    revenue: 0,

    reviews: 0,

    recentOrders: [],

    monthlySales: [],

  },

  loading: false,

  error: null,

};

// ===============================
// Slice
// ===============================

const dashboardSlice = createSlice({

  name: "dashboard",

  initialState,

  reducers: {

    clearDashboardError: (state) => {

      state.error = null;

    },

  },

  extraReducers: (builder) => {

    builder

      .addCase(
        fetchDashboardStats.pending,
        (state) => {

          state.loading = true;

          state.error = null;

        }
      )

      .addCase(
        fetchDashboardStats.fulfilled,
        (state, action) => {

          state.loading = false;

          state.stats = action.payload;

        }
      )

      .addCase(
        fetchDashboardStats.rejected,
        (state, action) => {

          state.loading = false;

          state.error = action.payload;

        }
      );

  },

});

export const {

  clearDashboardError,

} = dashboardSlice.actions;

export default dashboardSlice.reducer;