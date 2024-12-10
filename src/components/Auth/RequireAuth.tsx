import { useAuth } from "@/context/AuthContext";
import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";

const RequireAuth = (composedComponent: React.ReactNode) => {
  const Authentication = () => {
    const { verifyCode, token } = useAuth();

    useEffect(() => console.log("requireAuth", verifyCode), []);

    return verifyCode ? (
      token ? (
        composedComponent
      ) : (
        <Navigate to="/user/signin" />
      )
    ) : (
      <Navigate to="/" />
    );
  };

  return <Authentication />;
};

export default RequireAuth;

const CodeVerify = (composedComponent: React.ReactNode) => {
  const Authentication = () => {
    const { verifyCode } = useAuth();

    useEffect(() => console.log("codeVerify", verifyCode), []);

    return verifyCode ? composedComponent : <Navigate to="/code" />;
  };
  return <Authentication />;
};

const TokenVerify = (composedComponent: React.ReactNode) => {
  const Authentication = () => {
    const { token } = useAuth();

    useEffect(() => console.log("tokenVerify", token), []);
    return token ? composedComponent : <Navigate to="/user/signin" />;
  };
  return <Authentication />
};

export { CodeVerify, TokenVerify };
