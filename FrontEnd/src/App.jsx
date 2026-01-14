import React from "react";
import { Route, Routes, Navigate } from "react-router";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import "./index.css";
import { isAdmin } from "./lib/admin";

const App = () => {
  return (
    <div className="relative min-h-screen w-full text-base-content overflow-hidden">
      {/* BACKGROUND */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(
              120% 120% at 50% 10%,
              hsl(var(--b1)) 50%,
              transparent 85%
            ),
            radial-gradient(
              90% 70% at 50% 100%,
              rgba(0, 255, 157, 0.55),
              transparent 75%
            )
          `,
        }}
      />

      {/* CONTENT */}
      <div className="relative z-10">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/create"
            element={isAdmin() ? <CreatePage /> : <Navigate to="/" />}
          />
          <Route path="/project/:id" element={<ProjectDetailPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
