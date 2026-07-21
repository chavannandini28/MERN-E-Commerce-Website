import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import {
  createOrder,
  getMyOrders,
  getOrderById,
  getOrders,
  updateOrderStatus,
  cancelOrder,
} from "../api/orderApi";

// ======================================
// Create Order
// ======================================
export const placeOrder = createAsyncThunk(
  "orders/placeOrder",
  async (orderData, thunkAPI) => {
    try {
      const { data } = await createOrder(orderData);
      return data.order || data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Failed to place order"
      );
    }
  }
);

// ======================================
// My Orders
// ======================================
export const fetchMyOrders = createAsyncThunk(
  "orders/fetchMyOrders",
  async (_, thunkAPI) => {
    try {
      const { data } = await getMyOrders();
      return data.orders || data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Failed to load orders"
      );
    }
  }
);

// ======================================
// Single Order
// ======================================
export const fetchOrderById = createAsyncThunk(
  "orders/fetchOrderById",
  async (id, thunkAPI) => {
    try {
      const { data } = await getOrderById(id);
      return data.order || data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Failed to load order"
      );
    }
  }
);

// ======================================
// Admin Orders
// ======================================
export const fetchAllOrders = createAsyncThunk(
  "orders/fetchAllOrders",
  async (_, thunkAPI) => {
    try {
      const { data } = await getOrders();
      return data.orders || data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Failed to load orders"
      );
    }
  }
);

// ======================================
// Update Status
// ======================================
export const updateStatus = createAsyncThunk(
  "orders/updateStatus",
  async ({ id, status }, thunkAPI) => {
    try {
      const { data } = await updateOrderStatus(
        id,
        { status }
      );

      return data.order || data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Failed to update order"
      );
    }
  }
);

// ======================================
// Cancel Order
// ======================================
export const cancelUserOrder = createAsyncThunk(
  "orders/cancelOrder",
  async (id, thunkAPI) => {
    try {
      await cancelOrder(id);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Failed to cancel order"
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
  error: null,
};

// ======================================
// Slice
// ======================================
const orderSlice = createSlice({
  name: "orders",

  initialState,

  reducers: {
    clearOrder: (state) => {
      state.order = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // Create Order
      .addCase(placeOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(placeOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })

      .addCase(placeOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // My Orders
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

      // Order Details
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.order = action.payload;
      })

      // Admin Orders
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
      })

      // Update Status
      .addCase(updateStatus.fulfilled, (state, action) => {
        state.order = action.payload;
      })

      // Cancel Order
      .addCase(cancelUserOrder.fulfilled, (state, action) => {
        state.orders = state.orders.filter(
          (order) => order._id !== action.payload
        );
      });
  },
});

export const {
  clearOrder,
} = orderSlice.actions;

export default orderSlice.reducer;