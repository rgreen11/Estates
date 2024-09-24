import { createContext, useContext, useState, useEffect } from "react";
import { getCookie } from "./Cookies";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const cookieToken = getCookie("RichAuth");
    if (cookieToken) {
      setToken(cookieToken);
    } else {
      setToken(null);
    }
  }, []);

  console.log(token);

  const handleLogout = () => {
    setToken(null);
  };

  const value = {
    token,
    onLogout: handleLogout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
