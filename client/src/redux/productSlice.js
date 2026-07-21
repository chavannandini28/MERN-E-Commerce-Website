import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import {
  getProducts,
  getProductById,
} from "../api/productApi";

// ======================================
// Get All Products
// ======================================
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, thunkAPI) => {
    try {
      const { data } = await getProducts();

      return data.products || data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Failed to load products"
      );
    }
  }
);

// ======================================
// Get Single Product
// ======================================
export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (id, thunkAPI) => {
    try {
      const { data } = await getProductById(id);

      return data.product || data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Failed to load product"
      );
    }
  }
);

// ======================================
// Initial State
// ======================================
const initialState = {
  products: [],
  product: null,
  loading: false,
  error: null,
};

// ======================================
// Slice
// ======================================
const productSlice = createSlice({
  name: "products",

  initialState,

  reducers: {
    clearProduct: (state) => {
      state.product = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // Get Products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })

      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get Product By Id
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })

      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  clearProduct,
} = productSlice.actions;

export default productSlice.reducer;