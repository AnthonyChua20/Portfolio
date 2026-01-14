import axios from "axios";
import { isAdmin } from "./admin.js";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((config) => {
  if (isAdmin()) {
    config.headers["x-admin-key"] = import.meta.env.VITE_ADMIN_KEY;
  }
  return config;
});

export default api;