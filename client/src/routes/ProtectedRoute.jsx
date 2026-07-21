import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ roles = [] }) => {
  const { user, token } = useSelector(
    (state) => state.auth
  );

  // Not Logged In
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  // Role Check
  if (
    roles.length > 0 &&
    !roles.includes(user.role)
  ) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;