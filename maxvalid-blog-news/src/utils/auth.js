export const login = (email, password) => {
  // Mock login: Accept any valid-looking email and password for demonstration
  if (email && password) {
    localStorage.setItem("maxvalid_auth", JSON.stringify({
      email,
      name: "Super Admin",
      role: "admin"
    }));
    return true;
  }
  return false;
};

export const logout = () => {
  localStorage.removeItem("maxvalid_auth");
};

export const isAuthenticated = () => {
  const auth = localStorage.getItem("maxvalid_auth");
  return auth ? JSON.parse(auth) : null;
};
