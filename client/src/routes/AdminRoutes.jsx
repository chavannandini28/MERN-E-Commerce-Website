import { Routes, Route, Navigate } from "react-router-dom";

import AdminLayout from "../layouts/AdminLayout";

import AdminDashboard from "../admin/AdminDashboard";
import Analytics from "../admin/Analytics";

import ProductList from "../admin/ProductList";
import AddProduct from "../admin/AddProduct";
import EditProduct from "../admin/EditProduct";

import CategoryList from "../admin/CategoryList";
import BrandList from "../admin/BrandList";

import OrderList from "../admin/OrderList";

import UserList from "../admin/UserList";

import ReviewManagement from "../admin/ReviewManagement";

import CouponManagement from "../admin/CouponManagement";

import Settings from "../admin/Settings";

import AdminProfile from "../admin/AdminProfile";

const AdminRoutes = () => {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  if (!user || user.role !== "Admin") {
    return <Navigate to="/login" replace />;
  }

  return (

    <Routes>

      <Route
        path="/"
        element={<AdminLayout />}
      >

        <Route
          index
          element={<AdminDashboard />}
        />

        <Route
          path="analytics"
          element={<Analytics />}
        />

        {/* Products */}

        <Route
          path="products"
          element={<ProductList />}
        />

        <Route
          path="products/add"
          element={<AddProduct />}
        />

        <Route
          path="products/edit/:id"
          element={<EditProduct />}
        />

        {/* Categories */}

        <Route
          path="categories"
          element={<CategoryList />}
        />

        {/* Brands */}

        <Route
          path="brands"
          element={<BrandList />}
        />

        {/* Orders */}

        <Route
          path="orders"
          element={<OrderList />}
        />

        {/* Users */}

        <Route
          path="users"
          element={<UserList />}
        />

        {/* Reviews */}

        <Route
          path="reviews"
          element={<ReviewManagement />}
        />

        {/* Coupons */}

        <Route
          path="coupons"
          element={<CouponManagement />}
        />

        {/* Settings */}

        <Route
          path="settings"
          element={<Settings />}
        />

        {/* Profile */}

        <Route
          path="profile"
          element={<AdminProfile />}
        />

      </Route>

    </Routes>

  );

};

export default AdminRoutes;