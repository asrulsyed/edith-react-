import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";

const RequireAuth = (composedComponent: React.ReactNode) => {
  const Authentication = () => {
    const { token } = useAuth();

    return token ? composedComponent : <Navigate to="/user/signin" />;
  };

  return <Authentication />;
};

export default RequireAuth;
