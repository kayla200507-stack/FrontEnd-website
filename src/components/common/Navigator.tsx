import { useAuth } from "@/contexts/AuthContext";
import type { Role } from "@/types/user";
import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export function Navigator() {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setToken(localStorage.getItem("token"));
    setIsLoading(false);
  }, []);
  const { user, isAuthenticated } = useAuth();

  const getRedirectByRole = (role?: Role) => {
    switch (role) {
      case "admin":
        return "/admin";
      case "dosen":
        return "/dosen";
      default:
        return "mahasiswa";
    }
  };
  if (!isLoading) {
    if (user && isAuthenticated && token)
      return <Navigate to={getRedirectByRole(user?.role)} replace />;
    return <Outlet />;
  }
  return null;
}
