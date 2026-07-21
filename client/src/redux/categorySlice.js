import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
  category: null,
  loading: false,
  error: null,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
    },

    setCategory: (state, action) => {
      state.category = action.payload;
    },

    setCategoryLoading: (state, action) => {
      state.loading = action.payload;
    },

    setCategoryError: (state, action) => {
      state.error = action.payload;
    },

    clearCategoryError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setCategories,
  setCategory,
  setCategoryLoading,
  setCategoryError,
  clearCategoryError,
} = categorySlice.actions;

export default categorySlice.reducer;