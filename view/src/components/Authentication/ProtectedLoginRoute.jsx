import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

const ProtectedLoginRoute = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);

  const { token } = useAuth();
  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <div>Loading...</div>; // Display a loading indicator while fetching token
  }

  if (!isLoading && token) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedLoginRoute;