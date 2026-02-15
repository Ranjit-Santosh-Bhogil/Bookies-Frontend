import { createContext, useContext, useState, useEffect } from "react";
import { getToken, setToken, getUser, setUser } from "../api/client";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUserState] = useState(getUser());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setUserState(getUser());
    setLoading(false);
  }, []);

  const login = (token, userData) => {
    setToken(token);
    setUser(userData);
    setUserState(userData);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    setUserState(null);
  };

  const updateUser = (userData) => {
    setUser(userData);
    setUserState(userData);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, updateUser, isLoggedIn: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
