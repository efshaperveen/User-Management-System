import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AdminRoute({ children }) {
  const { isAuthenticated, user } = useAuth();

  // Not logged in
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  //  Logged in but not admin
  if (user.role !== "admin") {
    return <Navigate to="/profile" replace />;
  }

  // ✅ Admin user
  return children;
}
