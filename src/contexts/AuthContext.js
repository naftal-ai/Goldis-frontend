import { useState, createContext, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const token = localStorage.getItem("jwtToken");

  const isValidToken = (token = localStorage.getItem("jwtToken")) => {
    if (!token) return false;
    const { exp } = JSON.parse(atob(token.split(".")[1]));
    return exp > Date.now() / 1000;
  };

  const logout = () => {
    localStorage.removeItem("jwtToken");
    setIsLoggedIn(false);
  }

  useEffect(() => {
    if (token && isValidToken(token)) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, isValidToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
