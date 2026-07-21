import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaGithub,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer
      className="text-light mt-5"
      style={{
        background: "#0f172a",
      }}
    >
      <div className="container py-5">

        <div className="row">

          {/* Company */}

          <div className="col-lg-4 mb-4">

            <h3 className="fw-bold text-warning">
              NANDINI SHOP
            </h3>

            <p className="text-light mt-3">
              India's modern online shopping platform.
              Buy electronics, fashion, groceries and
              much more at the best prices.
            </p>

            <div className="d-flex gap-3 mt-4">

              <a href="#" className="btn btn-primary rounded-circle">
                <FaFacebookF />
              </a>

              <a href="#" className="btn btn-danger rounded-circle">
                <FaInstagram />
              </a>

              <a href="#" className="btn btn-info rounded-circle">
                <FaTwitter />
              </a>

              <a href="#" className="btn btn-primary rounded-circle">
                <FaLinkedinIn />
              </a>

              <a href="#" className="btn btn-dark rounded-circle">
                <FaGithub />
              </a>

            </div>

          </div>

          {/* Quick Links */}

          <div className="col-lg-2 col-md-6 mb-4">

            <h5 className="fw-bold mb-3">
              Quick Links
            </h5>

            <ul className="list-unstyled">

              <li className="mb-2">
                <Link className="text-light text-decoration-none" to="/">
                  Home
                </Link>
              </li>

              <li className="mb-2">
                <Link className="text-light text-decoration-none" to="/shop">
                  Shop
                </Link>
              </li>

              <li className="mb-2">
                <Link className="text-light text-decoration-none" to="/cart">
                  Cart
                </Link>
              </li>

              <li className="mb-2">
                <Link className="text-light text-decoration-none" to="/wishlist">
                  Wishlist
                </Link>
              </li>

              <li>
                <Link className="text-light text-decoration-none" to="/profile">
                  My Profile
                </Link>
              </li>

            </ul>

          </div>

          {/* Customer */}

          <div className="col-lg-3 col-md-6 mb-4">

            <h5 className="fw-bold mb-3">
              Customer Support
            </h5>

            <ul className="list-unstyled">

              <li className="mb-2">
                Help Center
              </li>

              <li className="mb-2">
                Return Policy
              </li>

              <li className="mb-2">
                Privacy Policy
              </li>

              <li className="mb-2">
                Terms & Conditions
              </li>

              <li>
                Shipping Policy
              </li>

            </ul>

          </div>

          {/* Contact */}

          <div className="col-lg-3">

            <h5 className="fw-bold mb-3">
              Contact
            </h5>

            <p>

              <FaMapMarkerAlt className="me-2 text-warning" />

              Pune, Maharashtra, India

            </p>

            <p>

              <FaPhoneAlt className="me-2 text-warning" />

              +91 7709881028

            </p>

            <p>

              <FaEnvelope className="me-2 text-warning" />

              support@Nandinishop.com

            </p>

          </div>

        </div>

      </div>

      <hr className="m-0 text-secondary" />

      <div className="text-center py-3">

        © {new Date().getFullYear()} Nandini SHOP |
        Designed with ❤️ Nandini Chavan

      </div>

    </footer>
  );
};

export default Footer;