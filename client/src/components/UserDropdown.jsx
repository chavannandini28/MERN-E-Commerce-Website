import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUserCircle,
  FaUser,
  FaBoxOpen,
  FaHeart,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

const UserDropdown = () => {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="position-relative">

      <button
        className="btn btn-light rounded-circle"
        onClick={() => setOpen(!open)}
      >
        <FaUserCircle size={22} />
      </button>

      {open && (
        <div
          className="card shadow border-0 position-absolute end-0 mt-2"
          style={{
            width: "260px",
            borderRadius: "18px",
            zIndex: 9999,
          }}
        >
          <div className="card-body p-0">

            <div className="text-center p-4 border-bottom">

              <FaUserCircle
                size={65}
                className="text-primary mb-2"
              />

              <h5 className="mb-1">
                Welcome
              </h5>

              <small className="text-muted">
                Happy Shopping!
              </small>

            </div>

            <Link
              to="/profile"
              className="dropdown-item py-3"
            >
              <FaUser className="me-2" />
              My Profile
            </Link>

            <Link
              to="/my-orders"
              className="dropdown-item py-3"
            >
              <FaBoxOpen className="me-2" />
              My Orders
            </Link>

            <Link
              to="/wishlist"
              className="dropdown-item py-3"
            >
              <FaHeart className="me-2 text-danger" />
              Wishlist
            </Link>

            <Link
              to="/settings"
              className="dropdown-item py-3"
            >
              <FaCog className="me-2" />
              Settings
            </Link>

            <button
              className="dropdown-item py-3 text-danger"
              onClick={logoutHandler}
            >
              <FaSignOutAlt className="me-2" />
              Logout
            </button>

          </div>
        </div>
      )}

    </div>
  );
};

export default UserDropdown;