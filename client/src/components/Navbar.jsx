import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaHeart, FaUser } from "react-icons/fa";

const Navbar = () => {

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const logoutHandler = () => {

    localStorage.clear();

    navigate("/login");

  };

  return (

    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">

      <div className="container">

        <Link className="navbar-brand fw-bold" to="/">
          MERN Shop
        </Link>

        <button
          className="navbar-toggler"
          data-bs-toggle="collapse"
          data-bs-target="#navbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbar">

          <ul className="navbar-nav ms-auto align-items-center">

            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/shop">
                Shop
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/cart">
                <FaShoppingCart />
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/wishlist">
                <FaHeart />
              </Link>
            </li>

            {token ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/profile">
                    <FaUser />
                  </Link>
                </li>

                <li className="nav-item">

                  <button
                    className="btn btn-danger btn-sm ms-2"
                    onClick={logoutHandler}
                  >
                    Logout
                  </button>

                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="btn btn-warning ms-2" to="/login">
                    Login
                  </Link>
                </li>
              </>
            )}

          </ul>

        </div>

      </div>

    </nav>

  );
};

export default Navbar;