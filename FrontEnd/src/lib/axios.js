import axios from "axios";
import { isAdmin } from "./admin.js";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

api.interceptors.request.use((config) => {
  if (isAdmin()) {
    config.headers["x-admin-key"] =
      import.meta.env.VITE_ADMIN_KEY;
  }
  return config;
});

export default api;