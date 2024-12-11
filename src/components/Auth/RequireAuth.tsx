import { useAuth } from "@/context/AuthContext";
import React from "react";
import { Navigate } from "react-router-dom";

const CodeVerify = (composedComponent: React.ReactNode) => {
  const Authentication = () => {
    const { verifyCode } = useAuth();

    return verifyCode ? composedComponent : <Navigate to="/code" />;
  };
  return <Authentication />;
};

const TokenVerify = (composedComponent: React.ReactNode) => {
  const Authentication = () => {
    const { logined } = useAuth();

    return logined ? composedComponent : <Navigate to="/user/signin" />;
  };
  return <Authentication />
};

export { CodeVerify, TokenVerify };
