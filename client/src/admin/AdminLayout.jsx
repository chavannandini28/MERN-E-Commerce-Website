import { useState } from "react";
import {
  NavLink,
  Outlet,
  useNavigate,
} from "react-router-dom";

import {
  FaBars,
  FaTimes,
  FaHome,
  FaBoxOpen,
  FaTags,
  FaTrademark,
  FaShoppingCart,
  FaUsers,
  FaStar,
  FaTicketAlt,
  FaChartBar,
  FaCog,
  FaUserShield,
  FaSignOutAlt,
} from "react-icons/fa";

const AdminLayout = () => {

  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] =
    useState(true);

  const logoutHandler = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    navigate("/login");

  };

  const menuItems = [

    {
      title: "Dashboard",
      icon: <FaHome />,
      path: "/admin",
    },

    {
      title: "Analytics",
      icon: <FaChartBar />,
      path: "/admin/analytics",
    },

    {
      title: "Products",
      icon: <FaBoxOpen />,
      path: "/admin/products",
    },

    {
      title: "Categories",
      icon: <FaTags />,
      path: "/admin/categories",
    },

    {
      title: "Brands",
      icon: <FaTrademark />,
      path: "/admin/brands",
    },

    {
      title: "Orders",
      icon: <FaShoppingCart />,
      path: "/admin/orders",
    },

    {
      title: "Users",
      icon: <FaUsers />,
      path: "/admin/users",
    },

    {
      title: "Reviews",
      icon: <FaStar />,
      path: "/admin/reviews",
    },

    {
      title: "Coupons",
      icon: <FaTicketAlt />,
      path: "/admin/coupons",
    },

    {
      title: "Settings",
      icon: <FaCog />,
      path: "/admin/settings",
    },

    {
      title: "Profile",
      icon: <FaUserShield />,
      path: "/admin/profile",
    },

  ];

  return (

    <div className="d-flex">

      {/* Sidebar */}

      <aside
        className={`bg-dark text-white p-3 ${
          sidebarOpen
            ? "d-block"
            : "d-none d-md-block"
        }`}
        style={{
          width: "260px",
          minHeight: "100vh",
        }}
      >

        <div className="d-flex justify-content-between align-items-center mb-4">

          <h4 className="fw-bold">

            Admin Panel

          </h4>

          <button
            className="btn btn-sm btn-light d-md-none"
            onClick={() =>
              setSidebarOpen(false)
            }
          >

            <FaTimes />

          </button>

        </div>

        <div className="list-group list-group-flush">

                      {menuItems.map((item) => (

            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/admin"}
              className={({ isActive }) =>
                `list-group-item list-group-item-action border-0 rounded mb-2 d-flex align-items-center ${
                  isActive
                    ? "active bg-primary text-white"
                    : "bg-dark text-white"
                }`
              }
            >

              <span className="me-3 fs-5">

                {item.icon}

              </span>

              {item.title}

            </NavLink>

          ))}

          <button
            className="btn btn-danger w-100 mt-4 d-flex align-items-center justify-content-center"
            onClick={logoutHandler}
          >

            <FaSignOutAlt className="me-2" />

            Logout

          </button>

        </div>

      </aside>

      {/* Main Content */}

      <div className="flex-grow-1">

        {/* Top Navbar */}

        <nav className="navbar navbar-light bg-white shadow-sm px-4">

          <div className="d-flex align-items-center">

            <button
              className="btn btn-outline-secondary me-3"
              onClick={() =>
                setSidebarOpen(!sidebarOpen)
              }
            >

              <FaBars />

            </button>

            <h4 className="mb-0 fw-bold">

              Admin Dashboard

            </h4>

          </div>

          <div className="d-flex align-items-center">

            <span className="fw-semibold">

              Welcome, Admin

            </span>

          </div>

        </nav>

        <main className="p-4">

          <Outlet />

        </main>

      </div>
              </div>



  );

};

export default AdminLayout;