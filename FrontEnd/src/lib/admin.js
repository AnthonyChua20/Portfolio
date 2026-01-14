export const isAdmin = () => {
  if (!import.meta.env.DEV) return false;
  return localStorage.getItem("isAdmin") === "true";
};

export const enterAdminMode = () => {
  if (!import.meta.env.DEV) return;
  localStorage.setItem("isAdmin", "true");
};

export const exitAdminMode = () => {
  localStorage.removeItem("isAdmin");
};