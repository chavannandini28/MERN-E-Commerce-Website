import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  getMyCart,
  addToCart,
  updateQuantity as updateCartApiQuantity,
  removeFromCart,
  clearCart,
} from "../api/cartApi";

// ======================================
// Get Cart
// ======================================

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, thunkAPI) => {
    try {
      const { data } = await getMyCart();
      return data.cart;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch cart"
      );
    }
  }
);

// ======================================
// Add To Cart
// ======================================

export const addItemToCart = createAsyncThunk(
  "cart/addItemToCart",
  async (cartData, thunkAPI) => {
    try {
      await addToCart(cartData);

      const { data } = await getMyCart();

      return data.cart;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to add item"
      );
    }
  }
);

// ======================================
// Update Quantity
// ======================================

export const updateCartQuantity = createAsyncThunk(
  "cart/updateQuantity",
  async ({ id, quantity }, thunkAPI) => {
    try {
      await updateCartApiQuantity(id, quantity);

      const { data } = await getMyCart();

      return data.cart;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update quantity"
      );
    }
  }
);

// ======================================
// Remove Item
// ======================================

export const removeCartItem = createAsyncThunk(
  "cart/removeCartItem",
  async (id, thunkAPI) => {
    try {
      await removeFromCart(id);

      const { data } = await getMyCart();

      return data.cart;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to remove item"
      );
    }
  }
);

// ======================================
// Clear Cart
// ======================================

export const clearUserCart = createAsyncThunk(
  "cart/clearUserCart",
  async (_, thunkAPI) => {
    try {
      await clearCart();

      return {
        items: [],
        subtotal: 0,
        tax: 0,
        shippingCharge: 0,
        discount: 0,
        totalAmount: 0,
        totalItems: 0,
        totalQuantity: 0,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to clear cart"
      );
    }
  }
);

const initialState = {
  cart: {
    items: [],
    subtotal: 0,
    tax: 0,
    shippingCharge: 0,
    discount: 0,
    totalAmount: 0,
    totalItems: 0,
    totalQuantity: 0,
  },
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
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

      .addCase(addItemToCart.fulfilled, (state, action) => {
        state.cart = action.payload;
      })

      .addCase(updateCartQuantity.fulfilled, (state, action) => {
        state.cart = action.payload;
      })

      .addCase(removeCartItem.fulfilled, (state, action) => {
        state.cart = action.payload;
      })

      .addCase(clearUserCart.fulfilled, (state) => {
        state.cart = {
          items: [],
          subtotal: 0,
          tax: 0,
          shippingCharge: 0,
          discount: 0,
          totalAmount: 0,
          totalItems: 0,
          totalQuantity: 0,
        };
      });
  },
});

// Aliases for old components
export { updateCartQuantity as updateQuantity };
export { removeCartItem as removeItem };

export default cartSlice.reducer;