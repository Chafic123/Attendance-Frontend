import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute({ requiredRole }) {
  const token = localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
  const userRole = localStorage.getItem("userRole") || sessionStorage.getItem("userRole");


  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (userRole === requiredRole.toLowerCase()) {
    return <Outlet />;
  }

}
