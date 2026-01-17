import axios from "axios";
import { isAdmin } from "./admin.js";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 15000,
});

api.interceptors.request.use((config) => {
  if (isAdmin()) {
    config.headers["x-admin-key"] = import.meta.env.VITE_ADMIN_KEY;
  }
  return config;
});

// Prevent infinite redirect loops
const isOnErrorRoute = () => {
    const path = window.location.pathname;
  return path === "/error" || path === "/not-found" || path === "/forbidden";
};

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;

    // Network error / backend down / CORS
    if (!error.response) {
      if (!isOnErrorRoute()) {
        window.location.assign("/error");
      }
      return Promise.reject(error);
    }

    // Status-based routing
    if (status === 404) {
      if (!isOnErrorRoute()) {
        window.location.assign("/not-found");
      }
    } else if (status === 401 || status === 403) {
      if (!isOnErrorRoute()) {
        window.location.assign("/forbidden");
      }
    } else if (status >= 500) {
      if (!isOnErrorRoute()) {
        window.location.assign("/error");
      }
    }

    return Promise.reject(error);
  }
);

export default api;
