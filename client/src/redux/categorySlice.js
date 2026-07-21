import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../api/categoryApi";

// ======================================
// Get Categories
// ======================================
export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async (_, thunkAPI) => {
    try {
      const { data } = await getCategories();

      return data.categories || data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Failed to load categories"
      );
    }
  }
);

// ======================================
// Create Category
// ======================================
export const addCategory = createAsyncThunk(
  "categories/addCategory",
  async (categoryData, thunkAPI) => {
    try {
      const { data } = await createCategory(categoryData);

      return data.category || data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Failed to create category"
      );
    }
  }
);

// ======================================
// Update Category
// ======================================
export const editCategory = createAsyncThunk(
  "categories/editCategory",
  async ({ id, categoryData }, thunkAPI) => {
    try {
      const { data } = await updateCategory(
        id,
        categoryData
      );

      return data.category || data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Failed to update category"
      );
    }
  }
);

// ======================================
// Delete Category
// ======================================
export const removeCategory = createAsyncThunk(
  "categories/removeCategory",
  async (id, thunkAPI) => {
    try {
      await deleteCategory(id);

      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Failed to delete category"
      );
    }
  }
);

// ======================================
// Initial State
// ======================================
const initialState = {
  categories: [],
  loading: false,
  success: false,
  error: null,
};

// ======================================
// Slice
// ======================================
const categorySlice = createSlice({
  name: "categories",

  initialState,

  reducers: {
    clearCategoryState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // Fetch
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })

      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add
      .addCase(addCategory.fulfilled, (state, action) => {
        state.success = true;
        state.categories.push(action.payload);
      })

      // Update
      .addCase(editCategory.fulfilled, (state, action) => {
        state.success = true;

        state.categories = state.categories.map((item) =>
          item._id === action.payload._id
            ? action.payload
            : item
        );
      })

      // Delete
      .addCase(removeCategory.fulfilled, (state, action) => {
        state.success = true;

        state.categories = state.categories.filter(
          (item) => item._id !== action.payload
        );
      });
  },
});

export const {
  clearCategoryState,
} = categorySlice.actions;

export default categorySlice.reducer;