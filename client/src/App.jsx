import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

// Layouts
import MainLayout from "./layouts/MainLayout";
import AdminLayout from "./layouts/AdminLayout";
import VendorLayout from "./layouts/VendorLayout";

// Routes
import ProtectedRoute from "./routes/ProtectedRoute";
import RoleBasedRoute from "./routes/RoleBasedRoute";

// Customer Pages
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import MyOrders from "./pages/MyOrders";
import OrderDetails from "./pages/OrderDetails";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentFailed from "./pages/PaymentFailed";
import NotFound from "./pages/NotFound";

// Admin Pages
import AdminDashboard from "./admin/AdminDashboard";
import UserList from "./admin/UserList";
import BrandList from "./admin/BrandList";
import AddBrand from "./admin/AddBrand";
import CategoryList from "./admin/CategoryList";
import AddCategory from "./admin/AddCategory";
import ProductList from "./admin/ProductList";
import AddProduct from "./admin/AddProduct";
import EditProduct from "./admin/EditProduct";
import OrderList from "./admin/OrderList";
import ReviewManagement from "./admin/ReviewManagement";

// Vendor Pages
import VendorDashboard from "./vendor/VendorDashboard";

function App() {
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />

      <Routes>
        {/* Customer Layout */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Customer Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/my-orders" element={<MyOrders />} />
            <Route path="/orders/:id" element={<OrderDetails />} />
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

        {/* Admin Routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<RoleBasedRoute allowedRoles={["Admin"]} />}>
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
                path="/admin/add-product"
                element={<AddProduct />}
              />
              <Route
                path="/admin/edit-product/:id"
                element={<EditProduct />}
              />
              <Route
                path="/admin/categories"
                element={<CategoryList />}
              />
              <Route
                path="/admin/add-category"
                element={<AddCategory />}
              />
              <Route
                path="/admin/brands"
                element={<BrandList />}
              />
              <Route
                path="/admin/add-brand"
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
        </Route>

        {/* Vendor Routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<RoleBasedRoute allowedRoles={["Vendor"]} />}>
            <Route element={<VendorLayout />}>
              <Route
                path="/vendor/dashboard"
                element={<VendorDashboard />}
              />
            </Route>
          </Route>
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;