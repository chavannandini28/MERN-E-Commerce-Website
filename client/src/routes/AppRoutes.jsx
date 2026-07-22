import { Routes, Route } from "react-router-dom";

// Layouts
import MainLayout from "../layouts/MainLayout";
import AdminLayout from "../layouts/AdminLayout";

// Route Protection
import ProtectedRoute from "./ProtectedRoute";
import RoleBasedRoute from "./RoleBasedRoute";

// Customer Pages
import Home from "../pages/Home";
import Shop from "../pages/Shop";
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart";
import Wishlist from "../pages/Wishlist";
import Checkout from "../pages/Checkout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../pages/Profile";
import MyOrders from "../pages/MyOrders";
import OrderDetails from "../pages/OrderDetails";
import PaymentSuccess from "../pages/PaymentSuccess";
import PaymentFailed from "../pages/PaymentFailed";
import NotFound from "../pages/NotFound";

// Admin Pages
import AdminDashboard from "../admin/AdminDashboard";
import UserList from "../admin/UserList";
import ProductList from "../admin/ProductList";
import AddProduct from "../admin/AddProduct";
import CategoryList from "../admin/CategoryList";
import AddCategory from "../admin/AddCategory";
import BrandList from "../admin/BrandList";
import AddBrand from "../admin/AddBrand";
import OrderList from "../admin/OrderList";
import ReviewManagement from "../admin/ReviewManagement";

const AppRoutes = () => {
  return (
    <Routes>

      {/* ================= PUBLIC ROUTES ================= */}

      <Route element={<MainLayout />}>

        <Route path="/" element={<Home />} />

        <Route path="/shop" element={<Shop />} />

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

      </Route>

      {/* ================= CUSTOMER ROUTES ================= */}

      <Route
        element={
          <ProtectedRoute />
        }
      >
        <Route element={<MainLayout />}>

          <Route
            path="/cart"
            element={<Cart />}
          />

          <Route
            path="/wishlist"
            element={<Wishlist />}
          />

          <Route
            path="/checkout"
            element={<Checkout />}
          />

          <Route
            path="/profile"
            element={
              <RoleBasedRoute
                allowedRoles={[
                  "customer",
                  "admin",
                  "vendor",
                ]}
              >
                <Profile />
              </RoleBasedRoute>
            }
          />

          <Route
            path="/my-orders"
            element={<MyOrders />}
          />

          <Route
            path="/order/:id"
            element={<OrderDetails />}
          />

          <Route
            path="/payment-success"
            element={<PaymentSuccess />}
          />

          <Route
            path="/payment-failed"
            element={<PaymentFailed />}
          />

        </Route>
      </Route>

      {/* ================= ADMIN ROUTES ================= */}

      <Route
        element={
          <ProtectedRoute
            roles={["admin"]}
          />
        }
      >
        <Route element={<AdminLayout />}>

          <Route
            path="/admin/dashboard"
            element={<AdminDashboard />}
          />

          <Route
            path="/admin/users"
            element={<UserList />}
          />

          <Route
            path="/admin/products"
            element={<ProductList />}
          />

          <Route
            path="/admin/products/add"
            element={<AddProduct />}
          />

          <Route
            path="/admin/categories"
            element={<CategoryList />}
          />

          <Route
            path="/admin/categories/add"
            element={<AddCategory />}
          />

          <Route
            path="/admin/brands"
            element={<BrandList />}
          />

          <Route
            path="/admin/brands/add"
            element={<AddBrand />}
          />

          <Route
            path="/admin/orders"
            element={<OrderList />}
          />

          <Route
            path="/admin/reviews"
            element={<ReviewManagement />}
          />

        </Route>
      </Route>

      {/* ================= 404 ================= */}

      <Route
        path="*"
        element={<NotFound />}
      />

    </Routes>
  );
};

export default AppRoutes;