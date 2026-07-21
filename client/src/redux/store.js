import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./authSlice";
import userReducer from "./userSlice";
import productReducer from "./productSlice";
import categoryReducer from "./categorySlice";
import brandReducer from "./brandSlice";
import cartReducer from "./cartSlice";
import wishlistReducer from "./wishlistSlice";
import orderReducer from "./orderSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    products: productReducer,
    categories: categoryReducer,
    brands: brandReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    orders: orderReducer,
  },
});