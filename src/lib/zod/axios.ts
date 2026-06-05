import axios from "axios";
import { useAuthStore } from "../../stores/authStore";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const publicAuthPaths = [
  "/auth/login",
  "/auth/register",
  "/auth/forgot-password",
  "/auth/reset-password",
];

axiosInstance.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  const requestUrl = config.url ?? "";
  const normalizedUrl = requestUrl.startsWith("/")
    ? requestUrl
    : `/${requestUrl}`;
  const isPublicAuthRoute = publicAuthPaths.some((path) =>
    normalizedUrl.startsWith(path),
  );

  if (token && !isPublicAuthRoute) {
    config.headers.Authorization = `Bearer ${token}`;
  } else if (isPublicAuthRoute) {
    delete config.headers.Authorization;
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const { clearAuth } = useAuthStore.getState();
      clearAuth();

      // Only redirect if not already on login page
      if (!window.location.pathname.includes("/auth/login")) {
        window.location.href = "/auth/login";
      }
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
