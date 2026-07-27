import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  createOrder,
  getMyOrders,
  getOrderById,
  cancelOrder,
} from "../api/orderApi";

// ======================================
// Create Order
// ======================================

export const placeOrder = createAsyncThunk(
  "order/placeOrder",
  async (orderData, thunkAPI) => {
    try {
      const { data } = await createOrder(orderData);
      return data.order;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Unable to place order"
      );
    }
  }
);

// ======================================
// Get My Orders
// ======================================

export const fetchMyOrders = createAsyncThunk(
  "order/fetchMyOrders",
  async (_, thunkAPI) => {
    try {
      const { data } = await getMyOrders();
      return data.orders;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Unable to fetch orders"
      );
    }
  }
);

// ======================================
// Get Order Details
// ======================================

export const fetchOrderDetails = createAsyncThunk(
  "order/fetchOrderDetails",
  async (id, thunkAPI) => {
    try {
      const { data } = await getOrderById(id);
      return data.order;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Unable to fetch order"
      );
    }
  }
);

// ======================================
// Cancel Order
// ======================================

export const cancelMyOrder = createAsyncThunk(
  "order/cancelOrder",
  async ({ id, reason }, thunkAPI) => {
    try {
      const { data } = await cancelOrder(id, reason);
      return data.order;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Unable to cancel order"
      );
    }
  }
);

// ======================================
// Initial State
// ======================================

const initialState = {
  orders: [],
  order: null,
  loading: false,
  success: false,
  error: null,
};

// ======================================
// Slice
// ======================================

const orderSlice = createSlice({
  name: "order",

  initialState,

  reducers: {
    clearOrderError: (state) => {
      state.error = null;
    },

    clearOrderSuccess: (state) => {
      state.success = false;
    },
  },

  extraReducers: (builder) => {
    builder

      // ======================================
      // Create Order
      // ======================================

      .addCase(placeOrder.pending, (state) => {
        state.loading = true;
      })

      .addCase(placeOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.order = action.payload;
      })

      .addCase(placeOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ======================================
      // Fetch Orders
      // ======================================

      .addCase(fetchMyOrders.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchMyOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })

      .addCase(fetchMyOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ======================================
      // Order Details
      // ======================================

      .addCase(fetchOrderDetails.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchOrderDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })

      .addCase(fetchOrderDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ======================================
      // Cancel Order
      // ======================================

      .addCase(cancelMyOrder.pending, (state) => {
        state.loading = true;
      })

      .addCase(cancelMyOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        state.orders = state.orders.map((item) =>
          item._id === action.payload._id
            ? action.payload
            : item
        );

        state.order = action.payload;
      })

      .addCase(cancelMyOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  clearOrderError,
  clearOrderSuccess,
} = orderSlice.actions;

export default orderSlice.reducer;