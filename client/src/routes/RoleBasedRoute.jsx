import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const RoleBasedRoute = ({
  children,
  allowedRoles = [],
}) => {
  const { user, token } = useSelector(
    (state) => state.auth
  );

  // Not Logged In
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  // Unauthorized
  if (
    allowedRoles.length > 0 &&
    !allowedRoles.includes(user.role)
  ) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RoleBasedRoute;