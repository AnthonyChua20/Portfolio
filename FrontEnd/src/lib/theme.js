const THEMES = ["garden", "dark"];

export const getTheme = () => {
  return localStorage.getItem("theme") || "garden";
};

export const setTheme = (theme) => {
  localStorage.setItem("theme", theme);
  document.documentElement.setAttribute("data-theme", theme);
};

export const toggleTheme = () => {
  const current = getTheme();
  const next = current === "garden" ? "dark" : "garden";
  setTheme(next);
  return next;
};