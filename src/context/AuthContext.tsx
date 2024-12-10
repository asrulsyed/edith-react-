import { createContext, useContext, useState } from "react";
import { AuthContextType } from "@/lib/types";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("EDITH_token")
  );
  const [logined, setLogined] = useState<boolean>(false);

  return (
    <AuthContext.Provider
      value={{
        token,
        logined,
        setToken,
        setLogined,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
