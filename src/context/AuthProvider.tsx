import { createContext, ReactNode, useState, useEffect } from "react";
import Cookies from "js-cookie";

interface User {
  uuid: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  signIn: (user: User, token: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = Cookies.get("authToken");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const signIn = (user: User, token: string) => {
    setUser(user);
    setToken(token);
    Cookies.set("authToken", token, { expires: 2 });
  };

  return (
    <AuthContext.Provider value={{ user, token, signIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
