import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  getReviews,
  getProductReviews,
  addReview,
  updateReview,
  deleteReview,
} from "../api/reviewApi";

// ===============================
// Get All Reviews (Admin)
// ===============================

export const fetchReviews = createAsyncThunk(
  "review/fetchReviews",
  async (_, thunkAPI) => {
    try {
      const { data } = await getReviews();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch reviews"
      );
    }
  }
);

// ===============================
// Get Product Reviews
// ===============================

export const fetchProductReviews =
  createAsyncThunk(
    "review/fetchProductReviews",
    async (productId, thunkAPI) => {
      try {
        const { data } =
          await getProductReviews(productId);
        return data;
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.message ||
            "Failed to fetch product reviews"
        );
      }
    }
  );

// ===============================
// Add Review
// ===============================

export const createReview =
  createAsyncThunk(
    "review/createReview",
    async (
      { productId, reviewData },
      thunkAPI
    ) => {
      try {
        const { data } =
          await addReview(
            productId,
            reviewData
          );
        return data;
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.message ||
            "Failed to add review"
        );
      }
    }
  );

// ===============================
// Update Review
// ===============================

export const editReview =
  createAsyncThunk(
    "review/editReview",
    async (
      { reviewId, reviewData },
      thunkAPI
    ) => {
      try {
        const { data } =
          await updateReview(
            reviewId,
            reviewData
          );
        return data;
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.message ||
            "Failed to update review"
        );
      }
    }
  );

// ===============================
// Delete Review
// ===============================

export const removeReview =
  createAsyncThunk(
    "review/removeReview",
    async (reviewId, thunkAPI) => {
      try {
        await deleteReview(reviewId);
        return reviewId;
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.message ||
            "Failed to delete review"
        );
      }
    }
  );

// ===============================
// Initial State
// ===============================

const initialState = {
  reviews: [],
  loading: false,
  error: null,
};

// ===============================
// Slice
// ===============================

const reviewSlice = createSlice({
  name: "review",
  initialState,

  reducers: {
    clearReviewError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(fetchReviews.pending, (state) => {
        state.loading = true;
      })

      .addCase(
        fetchReviews.fulfilled,
        (state, action) => {
          state.loading = false;
          state.reviews = action.payload;
        }
      )

      .addCase(
        fetchReviews.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      )

      .addCase(
        removeReview.fulfilled,
        (state, action) => {
          state.reviews =
            state.reviews.filter(
              (review) =>
                review._id !== action.payload
            );
        }
      );
  },
});

export const {
  clearReviewError,
} = reviewSlice.actions;

export default reviewSlice.reducer;