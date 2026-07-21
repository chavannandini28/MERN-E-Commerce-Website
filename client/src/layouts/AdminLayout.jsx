import { Outlet, NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUsers,
  FaBoxOpen,
  FaTags,
  FaLayerGroup,
  FaShoppingCart,
  FaStar,
  FaStore,
} from "react-icons/fa";

const AdminLayout = () => {
  const linkClass = ({ isActive }) =>
    `btn text-start mb-2 w-100 ${
      isActive ? "btn-primary text-white" : "btn-dark"
    }`;

  return (
    <div className="container-fluid">
      <div className="row">

        {/* Sidebar */}
        <div
          className="col-lg-2 col-md-3 p-0"
          style={{
            minHeight: "100vh",
            backgroundColor: "#111827",
          }}
        >
          <div className="text-center py-4 border-bottom border-secondary">
            <h3 className="text-warning fw-bold mb-0">
              MERN SHOP
            </h3>

            <small className="text-light">
              ADMIN PANEL
            </small>
          </div>

          <div className="d-flex flex-column p-3">

            <NavLink
              to="/admin/dashboard"
              className={linkClass}
            >
              <FaTachometerAlt className="me-2" />
              Dashboard
            </NavLink>

            <NavLink
              to="/admin/users"
              className={linkClass}
            >
              <FaUsers className="me-2" />
              Users
            </NavLink>

            <NavLink
              to="/admin/products"
              className={linkClass}
            >
              <FaBoxOpen className="me-2" />
              Products
            </NavLink>

            <NavLink
              to="/admin/categories"
              className={linkClass}
            >
              <FaLayerGroup className="me-2" />
              Categories
            </NavLink>

            <NavLink
              to="/admin/brands"
              className={linkClass}
            >
              <FaTags className="me-2" />
              Brands
            </NavLink>

            <NavLink
              to="/admin/orders"
              className={linkClass}
            >
              <FaShoppingCart className="me-2" />
              Orders
            </NavLink>

            <NavLink
              to="/admin/reviews"
              className={linkClass}
            >
              <FaStar className="me-2" />
              Reviews
            </NavLink>

            <NavLink
              to="/"
              className="btn btn-warning w-100 mt-4"
            >
              <FaStore className="me-2" />
              Visit Store
            </NavLink>

          </div>
        </div>

        {/* Main Content */}
        <div className="col-lg-10 col-md-9 bg-light">
          <div className="p-4">
            <Outlet />
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminLayout;