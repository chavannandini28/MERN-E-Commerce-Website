import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import {
  getDashboardStats,
  getRevenueAnalytics,
  getMonthlySales,
  getRecentOrders,
  getTopProducts,
  getTopCustomers,
  getLowStockProducts,
} from "../api/dashboardApi";

// ===============================
// Dashboard Stats
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
// Revenue Analytics
// ===============================

export const fetchRevenueAnalytics =
  createAsyncThunk(
    "dashboard/fetchRevenueAnalytics",
    async (_, thunkAPI) => {
      try {

        const { data } =
          await getRevenueAnalytics();

        return data;

      } catch (error) {

        return thunkAPI.rejectWithValue(
          error.response?.data?.message ||
            "Failed to load revenue"
        );

      }
    }
  );

// ===============================
// Monthly Sales
// ===============================

export const fetchMonthlySales =
  createAsyncThunk(
    "dashboard/fetchMonthlySales",
    async (_, thunkAPI) => {
      try {

        const { data } =
          await getMonthlySales();

        return data;

      } catch (error) {

        return thunkAPI.rejectWithValue(
          error.response?.data?.message ||
            "Failed to load sales"
        );

      }
    }
  );

// ===============================
// Recent Orders
// ===============================

export const fetchRecentOrders =
  createAsyncThunk(
    "dashboard/fetchRecentOrders",
    async (_, thunkAPI) => {
      try {

        const { data } =
          await getRecentOrders();

        return data;

      } catch (error) {

        return thunkAPI.rejectWithValue(
          error.response?.data?.message ||
            "Failed to load orders"
        );

      }
    }
  );

// ===============================
// Top Products
// ===============================

export const fetchTopProducts =
  createAsyncThunk(
    "dashboard/fetchTopProducts",
    async (_, thunkAPI) => {
      try {

        const { data } =
          await getTopProducts();

        return data;

      } catch (error) {

        return thunkAPI.rejectWithValue(
          error.response?.data?.message ||
            "Failed to load products"
        );

      }
    }
  );

// ===============================
// Top Customers
// ===============================

export const fetchTopCustomers =
  createAsyncThunk(
    "dashboard/fetchTopCustomers",
    async (_, thunkAPI) => {
      try {

        const { data } =
          await getTopCustomers();

        return data;

      } catch (error) {

        return thunkAPI.rejectWithValue(
          error.response?.data?.message ||
            "Failed to load customers"
        );

      }
    }
  );

// ===============================
// Low Stock Products
// ===============================

export const fetchLowStockProducts =
  createAsyncThunk(
    "dashboard/fetchLowStockProducts",
    async (_, thunkAPI) => {
      try {

        const { data } =
          await getLowStockProducts();

        return data;

      } catch (error) {

        return thunkAPI.rejectWithValue(
          error.response?.data?.message ||
            "Failed to load stock"
        );

      }
    }
  );

// ===============================
// Initial State
// ===============================

const initialState = {

  stats: {},

  revenue: [],

  monthlySales: [],

  recentOrders: [],

  topProducts: [],

  topCustomers: [],

  lowStockProducts: [],

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
      )

      .addCase(
        fetchRevenueAnalytics.fulfilled,
        (state, action) => {

          state.revenue = action.payload;

        }
      )

      .addCase(
        fetchMonthlySales.fulfilled,
        (state, action) => {

          state.monthlySales =
            action.payload;

        }
      )

      .addCase(
        fetchRecentOrders.fulfilled,
        (state, action) => {

          state.recentOrders =
            action.payload;

        }
      )

      .addCase(
        fetchTopProducts.fulfilled,
        (state, action) => {

          state.topProducts =
            action.payload;

        }
      )

      .addCase(
        fetchTopCustomers.fulfilled,
        (state, action) => {

          state.topCustomers =
            action.payload;

        }
      )

      .addCase(
        fetchLowStockProducts.fulfilled,
        (state, action) => {

          state.lowStockProducts =
            action.payload;

        }
      );

  },

});

export const {

  clearDashboardError,

} = dashboardSlice.actions;

export default dashboardSlice.reducer;