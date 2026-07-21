import { useState } from "react";
import {
  Link,
  NavLink,
  useNavigate,
} from "react-router-dom";

import {
  FaShoppingCart,
  FaHeart,
  FaUserCircle,
  FaSearch,
  FaBars,
} from "react-icons/fa";

import { useSelector } from "react-redux";

import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const token = localStorage.getItem("token");

  // Redux Data
  const cartItems =
    useSelector((state) => state.cart?.cartItems) || [];

  const wishlistItems =
    useSelector((state) => state.wishlist?.wishlistItems) || [];

  const cartCount = cartItems.length;
  const wishlistCount = wishlistItems.length;

  const handleSearch = (e) => {
    e.preventDefault();

    if (!search.trim()) return;

    navigate(`/shop?keyword=${search}`);
  };

  const logoutHandler = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg custom-navbar shadow-sm">

      <div className="container">

        {/* Logo */}

        <Link className="navbar-brand fw-bold fs-3 logo" to="/">
          MERN<span>Shop</span>
        </Link>

        {/* Mobile */}

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbar"
        >
          <FaBars />
        </button>

        <div className="collapse navbar-collapse" id="navbar">

          {/* Search */}

          <form
            className="d-flex mx-auto search-form"
            onSubmit={handleSearch}
          >

            <input
              type="text"
              className="form-control search-input"
              placeholder="Search Products..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

            <button className="btn search-btn">

              <FaSearch />

            </button>

          </form>

          {/* Menu */}

          <ul className="navbar-nav ms-auto align-items-center gap-lg-2">

            <li className="nav-item">

              <NavLink
                className="nav-link"
                to="/"
              >
                Home
              </NavLink>

            </li>

            <li className="nav-item">

              <NavLink
                className="nav-link"
                to="/shop"
              >
                Shop
              </NavLink>

            </li>

            {/* Wishlist */}

            <li className="nav-item position-relative">

              <NavLink
                className="nav-link icon"
                to="/wishlist"
              >
                <FaHeart size={21} />

                {wishlistCount > 0 && (
                  <span className="count-badge">

                    {wishlistCount}

                  </span>
                )}
              </NavLink>

            </li>

            {/* Cart */}

            <li className="nav-item position-relative">

              <NavLink
                className="nav-link icon"
                to="/cart"
              >
                <FaShoppingCart size={21} />

                {cartCount > 0 && (
                  <span className="count-badge">

                    {cartCount}

                  </span>
                )}
              </NavLink>

            </li>

            {!token ? (
              <>
                <li className="nav-item">

                  <Link
                    className="btn btn-primary rounded-pill px-4 me-2"
                    to="/login"
                  >
                    Login
                  </Link>

                </li>

                <li className="nav-item">

                  <Link
                    className="btn btn-outline-primary rounded-pill px-4"
                    to="/register"
                  >
                    Register
                  </Link>

                </li>
              </>
            ) : (
              <li className="nav-item dropdown">

                <button
                  className="btn profile-btn dropdown-toggle"
                  data-bs-toggle="dropdown"
                >
                  <FaUserCircle
                    size={30}
                  />
                </button>

                <ul className="dropdown-menu dropdown-menu-end">

                  <li>

                    <Link
                      className="dropdown-item"
                      to="/profile"
                    >
                      My Profile
                    </Link>

                  </li>

                  <li>

                    <Link
                      className="dropdown-item"
                      to="/my-orders"
                    >
                      My Orders
                    </Link>

                  </li>

                  <li>
                    <hr className="dropdown-divider" />
                  </li>

                  <li>

                    <button
                      className="dropdown-item text-danger"
                      onClick={logoutHandler}
                    >
                      Logout
                    </button>

                  </li>

                </ul>

              </li>
            )}

          </ul>

        </div>

      </div>

    </nav>
  );
};

export default Navbar;
