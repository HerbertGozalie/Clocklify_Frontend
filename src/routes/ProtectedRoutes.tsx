import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkAuth = () => {
      const savedToken = Cookies.get("token");
      setToken(savedToken || null);
      setLoading(false);
    };

    checkAuth();
  }, []);

  if (loading) {
    return <div>Loading....</div>;
  }

  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
