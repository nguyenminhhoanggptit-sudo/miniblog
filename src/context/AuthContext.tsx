import { createContext, useContext, useState, type ReactNode } from "react";

const KEY = "miniblog_user";

interface AuthCtx {
  user: string | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthCtx | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<string | null>(() =>
    localStorage.getItem(KEY),
  );

  const login = (username: string, password: string) => {
    if (username === "admin" && password === "123456") {
      localStorage.setItem(KEY, username);
      setUser(username);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem(KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth phải nằm trong AuthProvider");
  return ctx;
}
