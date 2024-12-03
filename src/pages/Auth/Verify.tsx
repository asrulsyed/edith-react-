import { Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { User } from "@/lib/types";

function isObjectEmpty(obj: User | null) {
  return obj && Object.keys(obj).length === 0 && obj.constructor === Object;
}

const Verify = () => {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!isObjectEmpty(user)) {
      if (user?.verify) {
        navigate("/home");
      }
    } else {
      navigate("/user/signin");
    }
  }, [user, navigate]);

  const handleSend = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/user/send-verify-email`,
        {
          token,
          user: { email: user?.email },
        }
      );
      console.log(response);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Typography variant="h5" className="!mb-10">
        Verify your email to continue.
      </Typography>
      <Button
        type="button"
        variant="contained"
        onClick={handleSend}
        disabled={isLoading}
        className="bg-blue-600 hover:bg-blue-700 h-10 disabled:bg-blue-400"
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Send Again
          </span>
        ) : (
          "Send Again "
        )}
      </Button>
    </div>
  );
};

export default Verify;
