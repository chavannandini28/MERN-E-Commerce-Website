import { configureStore } from "@reduxjs/toolkit";

// Authentication
import authReducer from "./authSlice";
import userReducer from "./userSlice";

// Products
import productReducer from "./productSlice";
import categoryReducer from "./categorySlice";
import brandReducer from "./brandSlice";

// Shopping
import cartReducer from "./cartSlice";
import wishlistReducer from "./wishlistSlice";

// Orders
import orderReducer from "./orderSlice";

// Reviews
import reviewReducer from "./reviewSlice";

// Coupons
import couponReducer from "./couponSlice";

// Dashboard
import dashboardReducer from "./dashboardSlice";

const store = configureStore({

  reducer: {

    auth: authReducer,

    user: userReducer,

    product: productReducer,

    category: categoryReducer,

    brand: brandReducer,

    cart: cartReducer,

    wishlist: wishlistReducer,

    order: orderReducer,

    review: reviewReducer,

    coupon: couponReducer,

    dashboard: dashboardReducer,

  },

  devTools: import.meta.env.DEV,

});

export default store;