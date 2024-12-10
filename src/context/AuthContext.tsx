import { createContext, useContext, useEffect, useState } from "react";
import { AuthContextType } from "@/lib/types";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [verifyCode, setVerifyCode] = useState<string | null>("");

  const [token, setToken] = useState<string | null>("");
  const [logined, setLogined] = useState<boolean>(false);

  useEffect(() => {
    setVerifyCode(localStorage.getItem("EDITH_code"));
    setToken(localStorage.getItem("EDITH_token"));
  }, []);

  useEffect(() => console.log("aaa", verifyCode), [verifyCode])

  return (
    <AuthContext.Provider
      value={{
        verifyCode,
        token,
        logined,
        setVerifyCode,
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
