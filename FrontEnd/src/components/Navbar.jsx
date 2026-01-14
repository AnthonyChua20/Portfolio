import { Link } from "react-router";
import { MoonIcon, SunIcon,TreePineIcon } from "lucide-react";
import { isAdmin } from "../lib/admin.js";
import { toggleTheme, getTheme } from "../lib/theme";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [theme, setTheme] = useState(getTheme());

  useEffect(() => {
    // ensure theme is applied on load
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const handleToggle = () => {
    const nextTheme = toggleTheme();
    setTheme(nextTheme);
  };

  return (
    <header className="bg-base-300 border-b border-base-content/10">
      <div className="mx-auto max-w-6xl px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Left */}
          <h1 className="text-3xl font-bold text-primary font-mono tracking-tighter">
            Portfolio
          </h1>

          {/* Right */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleToggle}
              className="btn btn-ghost btn-circle"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <SunIcon className="w-5 h-5" />
              ) : (
                <MoonIcon className="w-5 h-5" />
              ) }
            </button>

            {isAdmin() && (
              <Link to="/create" className="btn btn-primary btn-sm">
                Add Project
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;