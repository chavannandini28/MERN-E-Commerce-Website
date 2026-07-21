import { NavLink } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <div
      className="bg-dark text-white p-3"
      style={{ minHeight: "100vh" }}
    >
      <h3 className="mb-4">Admin Panel</h3>

      <NavLink
        to="/admin/dashboard"
        className="nav-link text-white mb-3"
      >
        Dashboard
      </NavLink>

      <NavLink
        to="/admin/users"
        className="nav-link text-white mb-3"
      >
        Users
      </NavLink>

      <NavLink
        to="/admin/products"
        className="nav-link text-white mb-3"
      >
        Products
      </NavLink>

      <NavLink
        to="/admin/categories"
        className="nav-link text-white mb-3"
      >
        Categories
      </NavLink>

      <NavLink
        to="/admin/brands"
        className="nav-link text-white mb-3"
      >
        Brands
      </NavLink>

      <NavLink
        to="/admin/orders"
        className="nav-link text-white mb-3"
      >
        Orders
      </NavLink>

      <NavLink
        to="/admin/reviews"
        className="nav-link text-white"
      >
        Reviews
      </NavLink>
    </div>
  );
};

export default AdminSidebar;