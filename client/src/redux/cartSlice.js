import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import {
  getMyCart,
  addToCart,
  updateCartQuantity,
  removeFromCart,
  clearCart,
  getCartTotal,
  getCartCount,
} from "../api/cartApi";

// ===================================
// Get Cart
// ===================================
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, thunkAPI) => {
    try {
      const { data } = await getMyCart();

      return data.cart || data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Failed to load cart"
      );
    }
  }
);

// ===================================
// Add To Cart
// ===================================
export const addItemToCart = createAsyncThunk(
  "cart/addItem",
  async (cartData, thunkAPI) => {
    try {
      const { data } = await addToCart(cartData);

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Failed to add item"
      );
    }
  }
);

// ===================================
// Update Quantity
// ===================================
export const updateQuantity = createAsyncThunk(
  "cart/updateQuantity",
  async ({ id, quantity }, thunkAPI) => {
    try {
      const { data } =
        await updateCartQuantity(id, {
          quantity,
        });

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Failed to update quantity"
      );
    }
  }
);

// ===================================
// Remove Item
// ===================================
export const removeCartItem = createAsyncThunk(
  "cart/removeItem",
  async (id, thunkAPI) => {
    try {
      await removeFromCart(id);

      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Failed to remove item"
      );
    }
  }
);

// ===================================
// Clear Cart
// ===================================
export const clearUserCart = createAsyncThunk(
  "cart/clearCart",
  async (_, thunkAPI) => {
    try {
      await clearCart();

      return true;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Failed to clear cart"
      );
    }
  }
);

// ===================================
// Get Cart Total
// ===================================
export const fetchCartTotal = createAsyncThunk(
  "cart/fetchTotal",
  async (_, thunkAPI) => {
    try {
      const { data } = await getCartTotal();

      return data.total || 0;
    } catch (error) {
      return thunkAPI.rejectWithValue(0);
    }
  }
);

// ===================================
// Get Cart Count
// ===================================
export const fetchCartCount = createAsyncThunk(
  "cart/fetchCount",
  async (_, thunkAPI) => {
    try {
      const { data } = await getCartCount();

      return data.count || 0;
    } catch (error) {
      return thunkAPI.rejectWithValue(0);
    }
  }
);

// ===================================
// Initial State
// ===================================
const initialState = {
  cart: [],
  total: 0,
  count: 0,
  loading: false,
  error: null,
};

// ===================================
// Slice
// ===================================
const cartSlice = createSlice({
  name: "cart",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      // Fetch Cart
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
      })

      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add Item
      .addCase(addItemToCart.fulfilled, () => {})

      // Remove Item
      .addCase(removeCartItem.fulfilled, (state, action) => {
        state.cart = state.cart.filter(
          (item) => item._id !== action.payload
        );
      })

      // Clear Cart
      .addCase(clearUserCart.fulfilled, (state) => {
        state.cart = [];
        state.total = 0;
        state.count = 0;
      })

      // Cart Total
      .addCase(fetchCartTotal.fulfilled, (state, action) => {
        state.total = action.payload;
      })

      // Cart Count
      .addCase(fetchCartCount.fulfilled, (state, action) => {
        state.count = action.payload;
      });
  },
});

export default cartSlice.reducer;