import { useAuth } from "@/contexts/AuthContext";
import type { Role } from "@/types/user";
import { Navigate, Outlet } from "react-router-dom";

interface ProtectedLayoutProps {
  allowedRoles: Role[];
}

export default function ProtectedLayout({
  allowedRoles,
}: ProtectedLayoutProps) {
  const { user, isAuthenticated } = useAuth();

  // if (!isAuthenticated || !user) return <Navigate to={"/auth/login"} replace />;

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    // return <Navigate to={"/auth/login"} replace />;
  }

  return <Outlet />;
}
