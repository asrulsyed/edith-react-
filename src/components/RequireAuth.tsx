import { useAuth } from "@/context/AuthContext"
import { Navigate } from "react-router-dom";

const RequireAuth = (composedComponent: React.ReactNode) => {
  const Authentication = () => {
    const {logined} = useAuth();
    return logined ? composedComponent : <Navigate to="/user/signin" />;
  };

  return <Authentication />;
}

export default RequireAuth;
