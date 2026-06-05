import { useAuthStore } from "@/stores/authStore";
import type { Role } from "@/types/user";
import { Navigate, Outlet, useLocation } from "react-router-dom";

interface ProtectedLayoutProps {
  allowedRoles?: Role[];
}

export default function ProtectedLayout({
  allowedRoles,
}: ProtectedLayoutProps) {
  const { user, isAuthenticated, isInitializing } = useAuthStore();
  const location = useLocation();

  // Prevent flickering during rehydration or auth check
  if (isInitializing) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Redirect based on role if they access forbidden area
    if (user.role === "mahasiswa") return <Navigate to="/mahasiswa" replace />;
    if (user.role === "dosen") return <Navigate to="/dosen" replace />;
    if (user.role === "admin") return <Navigate to="/admin" replace />;
    
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
