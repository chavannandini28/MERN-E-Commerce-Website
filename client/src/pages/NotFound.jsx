import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div
      className="container d-flex flex-column justify-content-center align-items-center"
      style={{ minHeight: "80vh" }}
    >
      <h1 className="display-1 fw-bold text-danger">404</h1>

      <h3>Page Not Found</h3>

      <p className="text-muted">
        The page you are looking for doesn't exist.
      </p>

      <Link to="/" className="btn btn-primary mt-3">
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;