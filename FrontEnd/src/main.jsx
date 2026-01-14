import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { Toaster } from "react-hot-toast";

import "./index.css";
import App from "./App.jsx";
import { getTheme } from "./lib/theme";

// ✅ Set theme BEFORE React renders
document.documentElement.setAttribute("data-theme", getTheme());

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
      <Toaster />
    </BrowserRouter>
  </StrictMode>
);
