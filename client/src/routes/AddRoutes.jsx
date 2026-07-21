import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Products from "../pages/Products";
import ProductDetails from "../pages/ProductDetails";

import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";

import Login from "../pages/Login";
import Register from "../pages/Register";

import Profile from "../pages/Profile";
import Orders from "../pages/Orders";
import OrderDetails from "../pages/OrderDetails";

import Wishlist from "../pages/Wishlist";

import PaymentSuccess from "../pages/PaymentSuccess";
import PaymentFailed from "../pages/PaymentFailed";

import NotFound from "../pages/NotFound";

import ProtectedRoute from "./ProtectedRoute";


const AppRoutes = () => {
  return (
    <Routes>

      {/* Public Routes */}
      <Route path="/" element={<Home />} />

      <Route
        path="/products"
        element={<Products />}
      />

      <Route
        path="/product/:id"
        element={<ProductDetails />}
      />


      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />


      {/* Protected User Routes */}

      <Route
        path="/cart"
        element={
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        }
      />


      <Route
        path="/checkout"
        element={
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        }
      />


      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />


      <Route
        path="/orders"
        element={
          <ProtectedRoute>
            <Orders />
          </ProtectedRoute>
        }
      />


      <Route
        path="/orders/:id"
        element={
          <ProtectedRoute>
            <OrderDetails />
          </ProtectedRoute>
        }
      />


      <Route
        path="/wishlist"
        element={
          <ProtectedRoute>
            <Wishlist />
          </ProtectedRoute>
        }
      />


      {/* Payment Routes */}

      <Route
        path="/payment-success"
        element={
          <ProtectedRoute>
            <PaymentSuccess />
          </ProtectedRoute>
        }
      />


      <Route
        path="/payment-failed"
        element={
          <ProtectedRoute>
            <PaymentFailed />
          </ProtectedRoute>
        }
      />


      {/* 404 */}
      <Route
        path="*"
        element={<NotFound />}
      />

    </Routes>
  );
};


export default AppRoutes;