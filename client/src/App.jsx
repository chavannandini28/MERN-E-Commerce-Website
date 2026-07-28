import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

// Layouts
import MainLayout from "./layouts/MainLayout";

// Admin
import AdminRoutes from "./routes/AdminRoutes";

// Public Pages
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

function App() {

  return (

    <BrowserRouter>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />

      <Routes>

        {/* Customer Layout */}

        <Route path="/" element={<MainLayout />}>

          <Route index element={<Home />} />

          <Route path="shop" element={<Shop />} />

          <Route
            path="product/:id"
            element={<ProductDetails />}
          />

          <Route path="cart" element={<Cart />} />

          <Route
            path="wishlist"
            element={<Wishlist />}
          />

          <Route
            path="checkout"
            element={<Checkout />}
          />

          <Route
            path="profile"
            element={<Profile />}
          />

          <Route
            path="orders"
            element={<MyOrders />}
          />

          <Route
            path="orders/:id"
            element={<OrderDetails />}
          />

          <Route
            path="payment-success"
            element={<PaymentSuccess />}
          />

          <Route
            path="payment-failed"
            element={<PaymentFailed />}
          />

        </Route>

        {/* Authentication */}

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        {/* Admin */}

        <Route
          path="/admin/*"
          element={<AdminRoutes />}
        />

        {/* 404 */}

        <Route
          path="*"
          element={<NotFound />}
        />

      </Routes>

    </BrowserRouter>

  );

}

export default App;