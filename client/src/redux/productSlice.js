import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  getProducts,
  getProductById,
  searchProducts,
  getCategoryProducts,
  getBrandProducts,
} from "../api/productApi";

/* ==============================
   Get All Products
============================== */

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, thunkAPI) => {
    try {
      const { data } = await getProducts();
      return data.products || data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Unable to fetch products"
      );
    }
  }
);

/* ==============================
   Get Product Details
============================== */

export const fetchProduct = createAsyncThunk(
  "products/fetchProduct",
  async (id, thunkAPI) => {
    try {
      const { data } = await getProductById(id);
      return data.product || data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Unable to fetch product"
      );
    }
  }
);

/* ==============================
   Search Products
============================== */

export const fetchSearchProducts = createAsyncThunk(
  "products/search",
  async (keyword, thunkAPI) => {
    try {
      const { data } = await searchProducts(keyword);
      return data.products || data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Search failed"
      );
    }
  }
);

/* ==============================
   Category Filter
============================== */

export const fetchCategoryProducts = createAsyncThunk(
  "products/category",
  async (id, thunkAPI) => {
    try {
      const { data } = await getCategoryProducts(id);
      return data.products || data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Category fetch failed"
      );
    }
  }
);

/* ==============================
   Brand Filter
============================== */

export const fetchBrandProducts = createAsyncThunk(
  "products/brand",
  async (id, thunkAPI) => {
    try {
      const { data } = await getBrandProducts(id);
      return data.products || data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Brand fetch failed"
      );
    }
  }
);

/* ==============================
   Slice
============================== */

const initialState = {
  products: [],
  product: null,
  loading: false,
  error: null,
};

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

      /* Fetch Products */

      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })

      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* Product Details */

      .addCase(fetchProduct.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })

      .addCase(fetchProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* Search */

      .addCase(fetchSearchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
      })

      /* Category */

      .addCase(fetchCategoryProducts.fulfilled, (state, action) => {
        state.products = action.payload;
      })

      /* Brand */

      .addCase(fetchBrandProducts.fulfilled, (state, action) => {
        state.products = action.payload;
      });
  },
});

export const { clearProduct } = productSlice.actions;

export default productSlice.reducer;