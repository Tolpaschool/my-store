import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute() {
  const { isAdmin } = useAuth();

  return isAdmin ? <Outlet /> : <Navigate to="/login" replace />;
}

export default ProtectedRoute;