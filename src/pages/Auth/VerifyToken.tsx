import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const VerifyToken = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setUser, setLogined } = useAuth();

  useEffect(() => {
    const jwtToken = localStorage.getItem("token");
    if (!jwtToken) {
      const fp = searchParams.get("firstpart");
      const sp = searchParams.get("secondpart");
      const tp = searchParams.get("thirdpart");
      const token = fp + "." + sp + "." + tp;
      const fetchData = async () => {
        await axios
          .post(`${import.meta.env.VITE_BACKEND_URL}/user/token-verification`, {
            token,
          })
          .then((res) => {
            if (res.status === 200) {
              localStorage.setItem("token", res.data.token);
              axios.defaults.headers.common["authorization"] = res.data.token;
              setLogined(true);
              setUser(res.data.user);
              navigate(`/home`);
            } else if (res.status === 201) {
              console.log(res.data);
            }
          })
          .catch((error) => {
            console.error(error);
          });
      };
      fetchData();
    }
  });

  return <></>;
};

export default VerifyToken;
