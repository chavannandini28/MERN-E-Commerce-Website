import "./AdminLayout.css";
import { Outlet, NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUsers,
  FaShoppingBag,
  FaTags,
  FaLayerGroup,
  FaClipboardList,
  FaStar,
  FaStore,
  FaSignOutAlt,
} from "react-icons/fa";

const AdminLayout = () => {
  return (
    <div className="container-fluid p-0">

      <div className="row g-0">

        {/* Sidebar */}

        <div
          className="col-lg-2 col-md-3"
          style={{
            minHeight: "100vh",
            background: "#0f172a",
          }}
        >
          <div className="p-4 text-center">

            <h3 className="text-white fw-bold">
              MERN SHOP
            </h3>

            <small className="text-light">
              Admin Panel
            </small>

          </div>

          <hr className="text-secondary" />

          <div className="nav flex-column">

            <NavLink
              to="/admin/dashboard"
              className="nav-link text-white px-4 py-3"
            >
              <FaTachometerAlt className="me-2" />
              Dashboard
            </NavLink>

            <NavLink
              to="/admin/users"
              className="nav-link text-white px-4 py-3"
            >
              <FaUsers className="me-2" />
              Users
            </NavLink>

            <NavLink
              to="/admin/products"
              className="nav-link text-white px-4 py-3"
            >
              <FaShoppingBag className="me-2" />
              Products
            </NavLink>

            <NavLink
              to="/admin/categories"
              className="nav-link text-white px-4 py-3"
            >
              <FaLayerGroup className="me-2" />
              Categories
            </NavLink>

            <NavLink
              to="/admin/brands"
              className="nav-link text-white px-4 py-3"
            >
              <FaTags className="me-2" />
              Brands
            </NavLink>

            <NavLink
              to="/admin/orders"
              className="nav-link text-white px-4 py-3"
            >
              <FaClipboardList className="me-2" />
              Orders
            </NavLink>

            <NavLink
              to="/admin/reviews"
              className="nav-link text-white px-4 py-3"
            >
              <FaStar className="me-2" />
              Reviews
            </NavLink>

            <NavLink
              to="/vendor/dashboard"
              className="nav-link text-white px-4 py-3"
            >
              <FaStore className="me-2" />
              Vendor
            </NavLink>

          </div>

          <div className="mt-auto p-4">

            <button className="btn btn-danger w-100">

              <FaSignOutAlt className="me-2" />

              Logout

            </button>

          </div>

        </div>

        {/* Content */}

        <div className="col-lg-10 col-md-9">

          {/* Header */}

          <nav className="navbar navbar-light bg-white shadow-sm px-4">

            <h4 className="mb-0 fw-bold">
              Admin Dashboard
            </h4>

            <div className="d-flex align-items-center">

              <img
                src="https://ui-avatars.com/api/?name=Admin"
                alt="Admin"
                width="45"
                height="45"
                className="rounded-circle"
              />

            </div>

          </nav>

          <div className="p-4 bg-light" style={{ minHeight: "90vh" }}>
            <Outlet />
          </div>

        </div>

      </div>

    </div>
  );
};

export default AdminLayout;