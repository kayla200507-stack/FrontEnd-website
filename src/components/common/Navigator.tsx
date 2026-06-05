import { useAuthStore } from "@/stores/authStore";
import type { Role } from "@/types/user";
import { Navigate, Outlet } from "react-router-dom";

export function Navigator() {
  const { user, isAuthenticated, isInitializing } = useAuthStore();

  const getRedirectByRole = (role?: Role) => {
    switch (role) {
      case "admin":
        return "/admin";
      case "dosen":
        return "/dosen";
      case "mahasiswa":
        return "/mahasiswa";
      default:
        return "/";
    }
  };

  if (isInitializing) return null;

  if (isAuthenticated && user) {
    return <Navigate to={getRedirectByRole(user.role)} replace />;
  }

  return <Outlet />;
}
