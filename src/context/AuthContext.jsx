import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

const ADMIN_PASSWORD = "admin123";

export function AuthProvider({ children }) {
  const [isAdmin, setIsAdmin] = useState(
    () => sessionStorage.getItem("isAdmin") === "true"
  );

  function login(password) {
    if (password !== ADMIN_PASSWORD) return false;

    sessionStorage.setItem("isAdmin", "true");
    setIsAdmin(true);
    return true;
  }

  function logout() {
    sessionStorage.removeItem("isAdmin");
    setIsAdmin(false);
  }

  return (
    <AuthContext.Provider value={{ isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext);
}