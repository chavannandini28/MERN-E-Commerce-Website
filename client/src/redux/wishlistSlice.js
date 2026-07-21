import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import {
  getMyWishlist,
  addToWishlist,
  removeFromWishlist,
  clearWishlist,
} from "../api/wishlistApi";

// ======================================
// Get Wishlist
// ======================================
export const fetchWishlist = createAsyncThunk(
  "wishlist/fetchWishlist",
  async (_, thunkAPI) => {
    try {
      const { data } = await getMyWishlist();

      return data.wishlist || data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Failed to load wishlist"
      );
    }
  }
);

// ======================================
// Add To Wishlist
// ======================================
export const addItemToWishlist = createAsyncThunk(
  "wishlist/addItem",
  async (wishlistData, thunkAPI) => {
    try {
      const { data } = await addToWishlist(wishlistData);

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Failed to add item"
      );
    }
  }
);

// ======================================
// Remove From Wishlist
// ======================================
export const removeWishlistItem = createAsyncThunk(
  "wishlist/removeItem",
  async (id, thunkAPI) => {
    try {
      await removeFromWishlist(id);

      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Failed to remove item"
      );
    }
  }
);

// ======================================
// Clear Wishlist
// ======================================
export const clearUserWishlist = createAsyncThunk(
  "wishlist/clearWishlist",
  async (_, thunkAPI) => {
    try {
      await clearWishlist();

      return true;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Failed to clear wishlist"
      );
    }
  }
);

// ======================================
// Initial State
// ======================================
const initialState = {
  wishlist: [],
  loading: false,
  error: null,
};

// ======================================
// Slice
// ======================================
const wishlistSlice = createSlice({
  name: "wishlist",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      // Fetch Wishlist
      .addCase(fetchWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.wishlist = action.payload;
      })

      .addCase(fetchWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add Item
      .addCase(addItemToWishlist.fulfilled, () => {})

      // Remove Item
      .addCase(removeWishlistItem.fulfilled, (state, action) => {
        state.wishlist = state.wishlist.filter(
          (item) => item._id !== action.payload
        );
      })

      // Clear Wishlist
      .addCase(clearUserWishlist.fulfilled, (state) => {
        state.wishlist = [];
      });
  },
});

export default wishlistSlice.reducer;