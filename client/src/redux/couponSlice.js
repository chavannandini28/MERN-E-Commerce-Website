import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import {
  getCoupons,
  createCoupon,
  updateCoupon,
  deleteCoupon,
} from "../api/couponApi";

// ===============================
// Get All Coupons
// ===============================

export const fetchCoupons =
  createAsyncThunk(
    "coupon/fetchCoupons",
    async (_, thunkAPI) => {
      try {
        const { data } =
          await getCoupons();

        return data;

      } catch (error) {

        return thunkAPI.rejectWithValue(
          error.response?.data?.message ||
            "Failed to fetch coupons"
        );

      }
    }
  );

// ===============================
// Create Coupon
// ===============================

export const addCoupon =
  createAsyncThunk(
    "coupon/addCoupon",
    async (couponData, thunkAPI) => {
      try {

        const { data } =
          await createCoupon(
            couponData
          );

        return data;

      } catch (error) {

        return thunkAPI.rejectWithValue(
          error.response?.data?.message ||
            "Failed to create coupon"
        );

      }
    }
  );

// ===============================
// Update Coupon
// ===============================

export const editCoupon =
  createAsyncThunk(
    "coupon/editCoupon",
    async (
      { id, couponData },
      thunkAPI
    ) => {
      try {

        const { data } =
          await updateCoupon(
            id,
            couponData
          );

        return data;

      } catch (error) {

        return thunkAPI.rejectWithValue(
          error.response?.data?.message ||
            "Failed to update coupon"
        );

      }
    }
  );

// ===============================
// Delete Coupon
// ===============================

export const removeCoupon =
  createAsyncThunk(
    "coupon/removeCoupon",
    async (id, thunkAPI) => {
      try {

        await deleteCoupon(id);

        return id;

      } catch (error) {

        return thunkAPI.rejectWithValue(
          error.response?.data?.message ||
            "Failed to delete coupon"
        );

      }
    }
  );

// ===============================
// Initial State
// ===============================

const initialState = {

  coupons: [],

  loading: false,

  error: null,

};

// ===============================
// Slice
// ===============================

const couponSlice = createSlice({

  name: "coupon",

  initialState,

  reducers: {

    clearCouponError: (state) => {

      state.error = null;

    },

  },

  extraReducers: (builder) => {

    builder

      .addCase(
        fetchCoupons.pending,
        (state) => {

          state.loading = true;

        }
      )

      .addCase(
        fetchCoupons.fulfilled,
        (state, action) => {

          state.loading = false;

          state.coupons = action.payload;

        }
      )

      .addCase(
        fetchCoupons.rejected,
        (state, action) => {

          state.loading = false;

          state.error = action.payload;

        }
      )

      .addCase(
        addCoupon.fulfilled,
        (state, action) => {

          state.coupons.unshift(
            action.payload
          );

        }
      )

      .addCase(
        editCoupon.fulfilled,
        (state, action) => {

          state.coupons =
            state.coupons.map((coupon) =>
              coupon._id ===
              action.payload._id
                ? action.payload
                : coupon
            );

        }
      )

      .addCase(
        removeCoupon.fulfilled,
        (state, action) => {

          state.coupons =
            state.coupons.filter(
              (coupon) =>
                coupon._id !==
                action.payload
            );

        }
      );

  },

});

export const {

  clearCouponError,

} = couponSlice.actions;

export default couponSlice.reducer;