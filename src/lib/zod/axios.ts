import axios, { AxiosHeaders, type AxiosHeaderValue } from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

const headerDefaults = {
  "Content-Type": "application/json",
};

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: false,
  headers: headerDefaults,
});

axiosInstance.interceptors.request.use((cfg) => {
  const token = localStorage.getItem("token");
  if (token) {
    cfg.headers.Authorization = `Bearer ${token}`;
  }
  return cfg;
});

axiosInstance.interceptors.response.use(
  (res) => res,
  (err) => {
    const url = err.config.url;
    if (err.response?.status === 401 && url !== "/auth/login") {
      localStorage.removeItem("token");
      window.location.href = "/auth/login";
    }
    return Promise.reject(err);
  },
);

export default axiosInstance;
