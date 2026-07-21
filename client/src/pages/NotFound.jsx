import { Link } from "react-router-dom";
import {
  FaExclamationTriangle,
  FaHome,
  FaShoppingBag,
} from "react-icons/fa";

const NotFound = () => {
  return (
    <div
      className="container d-flex align-items-center justify-content-center"
      style={{ minHeight: "80vh" }}
    >
      <div className="text-center">

        <div
          className="mx-auto mb-4 d-flex align-items-center justify-content-center rounded-circle shadow"
          style={{
            width: "150px",
            height: "150px",
            background: "#fff3cd",
          }}
        >
          <FaExclamationTriangle
            size={80}
            className="text-warning"
          />
        </div>

        <h1
          className="fw-bold"
          style={{
            fontSize: "90px",
          }}
        >
          404
        </h1>

        <h2 className="fw-bold mb-3">
          Oops! Page Not Found
        </h2>

        <p
          className="text-muted mx-auto"
          style={{
            maxWidth: "600px",
          }}
        >
          The page you're looking for doesn't exist,
          may have been moved, or the URL is incorrect.
        </p>

        <div className="mt-4">

          <Link
            to="/"
            className="btn btn-primary btn-lg me-3"
          >
            <FaHome className="me-2" />
            Go Home
          </Link>

          <Link
            to="/shop"
            className="btn btn-outline-dark btn-lg"
          >
            <FaShoppingBag className="me-2" />
            Continue Shopping
          </Link>

        </div>

      </div>
    </div>
  );
};

export default NotFound;