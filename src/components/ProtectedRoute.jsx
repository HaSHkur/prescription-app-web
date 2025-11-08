import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { token } = useAuth();

  const location = useLocation();

  const savedToken = localStorage.getItem("token");

  if (!token && !savedToken) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  return token ? children : <Navigate to="/" />;
}
