import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import {
  getBrands,
  createBrand,
  updateBrand,
  deleteBrand,
} from "../api/brandApi";

// ======================================
// Get Brands
// ======================================
export const fetchBrands = createAsyncThunk(
  "brands/fetchBrands",
  async (_, thunkAPI) => {
    try {
      const { data } = await getBrands();

      return data.brands || data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Failed to load brands"
      );
    }
  }
);

// ======================================
// Create Brand
// ======================================
export const addBrand = createAsyncThunk(
  "brands/addBrand",
  async (brandData, thunkAPI) => {
    try {
      const { data } = await createBrand(brandData);

      return data.brand || data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Failed to create brand"
      );
    }
  }
);

// ======================================
// Update Brand
// ======================================
export const editBrand = createAsyncThunk(
  "brands/editBrand",
  async ({ id, brandData }, thunkAPI) => {
    try {
      const { data } = await updateBrand(
        id,
        brandData
      );

      return data.brand || data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Failed to update brand"
      );
    }
  }
);

// ======================================
// Delete Brand
// ======================================
export const removeBrand = createAsyncThunk(
  "brands/removeBrand",
  async (id, thunkAPI) => {
    try {
      await deleteBrand(id);

      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Failed to delete brand"
      );
    }
  }
);

// ======================================
// Initial State
// ======================================
const initialState = {
  brands: [],
  loading: false,
  success: false,
  error: null,
};

// ======================================
// Slice
// ======================================
const brandSlice = createSlice({
  name: "brands",

  initialState,

  reducers: {
    clearBrandState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // Fetch Brands
      .addCase(fetchBrands.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchBrands.fulfilled, (state, action) => {
        state.loading = false;
        state.brands = action.payload;
      })

      .addCase(fetchBrands.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add Brand
      .addCase(addBrand.fulfilled, (state, action) => {
        state.success = true;
        state.brands.push(action.payload);
      })

      // Update Brand
      .addCase(editBrand.fulfilled, (state, action) => {
        state.success = true;

        state.brands = state.brands.map((item) =>
          item._id === action.payload._id
            ? action.payload
            : item
        );
      })

      // Delete Brand
      .addCase(removeBrand.fulfilled, (state, action) => {
        state.success = true;

        state.brands = state.brands.filter(
          (item) => item._id !== action.payload
        );
      });
  },
});

export const {
  clearBrandState,
} = brandSlice.actions;

export default brandSlice.reducer;