import { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { User, AuthContextType } from "../types/user";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = () => {
      const storedToken = Cookies.get("token");
      const storedUser = Cookies.get("user");

      if (storedToken && storedUser) {
        setToken(storedToken);
        try {
          setUser(JSON.parse(storedUser));
        } catch (error) {
          console.error("Failed to parse stored user data:", error);
          // If user data is invalid, clear everything
          signOut();
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const signIn = (user: User, token: string) => {
    setUser(user);
    setToken(token);
    // Store both token and user data
    Cookies.set("token", token, { expires: 2 });
    Cookies.set("user", JSON.stringify(user), { expires: 2 });
  };

  const signOut = () => {
    setUser(null);
    setToken(null);
    Cookies.remove("authToken");
    Cookies.remove("user");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, token, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
