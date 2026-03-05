"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type AuthContextType = {
  token: string | null;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  token: null,
  logout: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("token");

    if (!stored) {
      router.push("/login");
    }

    setToken(stored);
  }, []);

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user_email");

    setToken(null);

    router.replace("/login");
  }

  return (
    <AuthContext.Provider value={{ token, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
