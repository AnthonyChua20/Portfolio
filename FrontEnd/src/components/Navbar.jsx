import { Link } from "react-router";
import { MoonIcon, SunIcon, ShieldCheckIcon } from "lucide-react";
import { isAdmin } from "../lib/admin.js";
import { toggleTheme, getTheme } from "../lib/theme";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [theme, setTheme] = useState(getTheme());

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const handleToggle = () => {
    const next = toggleTheme();
    setTheme(next);
  };

  return (
    <header className="sticky top-0 z-50 bg-base-300/80 backdrop-blur border-b border-base-content/10">
      <div className="mx-auto max-w-6xl px-6 py-3 flex items-center justify-between">
        <h1 className="flex items-center gap-2 text-2xl font-extrabold text-primary">
          <ShieldCheckIcon className="w-6 h-6" />
          Anthony
        </h1>

        <div className="flex items-center gap-4">
          <button
            onClick={handleToggle}
            className="btn btn-circle btn-ghost transition-transform hover:scale-105"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <SunIcon className="w-5 h-5 text-yellow-400" />
            ) : (
              <MoonIcon className="w-5 h-5 text-indigo-500" />
            )}
          </button>

          {isAdmin() && (
            <Link to="/create" className="btn btn-sm btn-primary">
              Add Project
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
