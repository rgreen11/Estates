import { createContext, useContext, useState, useEffect } from "react";
import { getCookie } from "./Cookies";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [authorize, setAuthorize] = useState(null);
  useEffect(() => {
    const cookieToken = getCookie("RichAuth");
    if (cookieToken) {
      setToken(cookieToken);
      const validateToken = async () => {
        const request = new Request(
          "http://localhost:8080/admin/authenticate-route",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              cookieToken,
            },
          },
        );

        return await fetch(request)
          .then((status) => {
            if (status.ok) {
              setAuthorize(true);
            } else {
              setAuthorize(false);
            }
          })
          .catch((e) => {
            setAuthorize(false);
          });
      };
      validateToken();
    } else {
      setToken(null);
    }
  }, [authorize]);

  const handleLogout = async () => {
    const request = new Request("http://localhost:8080/admin/logout", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    setToken(null);
    return await fetch(request)
      .then((status) => {
        if (status.ok) {
          setAuthorize(true);
        } else {
          setAuthorize(false);
        }
      })
      .catch((e) => {
        setAuthorize(false);
      });
  };

  const value = {
    token,
    onLogout: handleLogout,
    authorize,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
