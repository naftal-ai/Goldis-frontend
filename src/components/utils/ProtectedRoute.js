import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const ProtectedRoute = ({ children }) => {
  const { logout, isValidToken } = useAuth();
  const location = useLocation();

  const isAuthenticated = isValidToken();
  if (!isAuthenticated) {
    logout();
    return (
      <Navigate
        to={`/login?redirect=${encodeURIComponent(location.pathname)}`}
      />
    );
  }

  return children;
};

export default ProtectedRoute;
