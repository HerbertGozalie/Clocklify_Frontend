import { useEffect, useState } from "react";
import Cookie from "js-cookie";
import { Navigate, Outlet } from "react-router-dom";

const AuthRoutes = () => {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkAuth = () => {
      const savedToken = Cookie.get("token");
      setToken(savedToken || null);
      setLoading(false);
    };

    checkAuth();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  // If user is already authenticated, redirect to timer page
  return token ? <Navigate to="/timer" replace /> : <Outlet />;
};

export default AuthRoutes;
