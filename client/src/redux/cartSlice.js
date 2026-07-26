import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  getMyCart,
  addToCart,
  updateQuantity,
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
        error.response?.data?.message
      );
    }
  }
);

// ======================================
// Add To Cart
// ======================================

export const addItemToCart = createAsyncThunk(
  "cart/addItem",
  async (cartData, thunkAPI) => {
    try {
      await addToCart(cartData);

      const { data } = await getMyCart();

      return data.cart;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message
      );
    }
  }
);

// ======================================
// Update Quantity
// ======================================

export const updateCartQuantity =
  createAsyncThunk(
    "cart/updateQuantity",
    async ({ id, quantity }, thunkAPI) => {
      try {
        await updateQuantity(id, quantity);

        const { data } = await getMyCart();

        return data.cart;
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.message
        );
      }
    }
  );

// ======================================
// Remove Item
// ======================================

export const removeCartItem =
  createAsyncThunk(
    "cart/removeItem",
    async (id, thunkAPI) => {
      try {
        await removeFromCart(id);

        const { data } = await getMyCart();

        return data.cart;
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.message
        );
      }
    }
  );

// ======================================
// Clear Cart
// ======================================

export const clearUserCart =
  createAsyncThunk(
    "cart/clearCart",
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
          error.response?.data?.message
        );
      }
    }
  );

// ======================================
// Slice
// ======================================

const cartSlice = createSlice({
  name: "cart",

  initialState: {
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
  },

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

      .addCase(addItemToCart.fulfilled, (state, action) => {
        state.cart = action.payload;
      })

      .addCase(updateCartQuantity.fulfilled, (state, action) => {
        state.cart = action.payload;
      })

      .addCase(removeCartItem.fulfilled, (state, action) => {
        state.cart = action.payload;
      })

      .addCase(clearUserCart.fulfilled, (state, action) => {
        state.cart = action.payload;
      })

      .addMatcher(
        (action) => action.type.startsWith("cart/") && action.type.endsWith("/rejected"),
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export default cartSlice.reducer;