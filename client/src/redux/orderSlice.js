import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
  order: null,
  loading: false,
  error: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrders: (state, action) => {
      state.orders = action.payload;
    },

    setOrder: (state, action) => {
      state.order = action.payload;
    },

    setOrderLoading: (state, action) => {
      state.loading = action.payload;
    },

    setOrderError: (state, action) => {
      state.error = action.payload;
    },

    clearOrderError: (state) => {
      state.error = null;
    },

    clearOrder: (state) => {
      state.order = null;
    },
  },
});

export const {
  setOrders,
  setOrder,
  setOrderLoading,
  setOrderError,
  clearOrderError,
  clearOrder,
} = orderSlice.actions;

export default orderSlice.reducer;