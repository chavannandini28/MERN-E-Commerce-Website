import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  brands: [],
  brand: null,
  loading: false,
  error: null,
};

const brandSlice = createSlice({
  name: "brand",
  initialState,
  reducers: {
    setBrands: (state, action) => {
      state.brands = action.payload;
    },

    setBrand: (state, action) => {
      state.brand = action.payload;
    },

    setBrandLoading: (state, action) => {
      state.loading = action.payload;
    },

    setBrandError: (state, action) => {
      state.error = action.payload;
    },

    clearBrandError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setBrands,
  setBrand,
  setBrandLoading,
  setBrandError,
  clearBrandError,
} = brandSlice.actions;

export default brandSlice.reducer;