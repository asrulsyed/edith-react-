import { createContext, useContext, useState } from "react";
import { AuthContextType, User } from "@/lib/types";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const [user, setUser] = useState<User | null>(null);
  const [logined, setLogined] = useState<boolean>(false);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        logined,
        setToken,
        setUser,
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
