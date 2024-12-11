import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const ConfirmToken = () => {
  const { setToken, setLogined } = useAuth();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => { 
    const token = searchParams.get('token');
    if (token) {
      setToken(token);
      setLogined(true);
      localStorage.setItem('EDITH_token', token);
      navigate('/chat');
    }
  }, [navigate, searchParams, setLogined, setToken]);

  return <></>;
};

export default ConfirmToken;
