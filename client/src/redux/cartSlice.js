import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",

  initialState: {
    items: [],
    total: 0,
    count: 0,
  },

  reducers: {
    setCart(state, action) {
      state.items = action.payload;
    },

    setTotal(state, action) {
      state.total = action.payload;
    },

    setCount(state, action) {
      state.count = action.payload;
    },
  },
});

export const {
  setCart,
  setTotal,
  setCount,
} = cartSlice.actions;

export default cartSlice.reducer;