import { useAuth } from "@/context/AuthContext";
import { toast } from "@/hooks/use-toast";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

interface CodeProps {
  code: string;
}

const Code = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CodeProps>();

  const { setVerifyCode } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit = async (code: CodeProps) => {
    setIsLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/auth/verify-code`,
        code
      );
      if (res.status === 200) {
        setVerifyCode(res.data.code);
        localStorage.setItem("EDITH_code", res.data.code);
        navigate("/chat/text");
      } else {
        toast({
          variant: "destructive",
          description: res.data,
        });
      }
    } catch (error) {
      console.error("Registration error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const verifyCode = localStorage.getItem('EDITH_code');
    if (verifyCode) {
      navigate('/chat')
    }
  }, [navigate])

  return (
    <Box className="flex flex-col items-center justify-center min-h-screen bg-mainBg font-Sofia text-buttonFont">
      <div className="flex items-end border-none outline-none focus:outline-none p-0 !mb-5">
        <img
          src="/logo-light.png"
          alt="logo"
          className="w-[22px] h-[26px] mr-0.5"
        />
        <span className="text-mainFont text-[40px] font-bold leading-[24px]">
          .D.I.T.H
        </span>
      </div>

      {/* form */}
      <Box className="w-full max-w-sm p-6 space-y-4">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-start space-y-10"
        >
          <FormControl
            sx={{
              width: "100%",
              backgroundColor: "var(--bg-input)",
            }}
            variant="outlined"
          >
            <InputLabel
              htmlFor="outlined-adornment-code"
              sx={{
                color: "var(--font-button)",
                "&.Mui-focused": {
                  color: "var(--font-button)",
                },
              }}
            >
              Code
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-code"
              type="code"
              error={!!errors.code}
              label="Code"
              sx={{
                color: "white", // Change input text color
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "var(--border-primary)", // Change border color
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "var(--border-secondary)", // Optional: Change border color on hover
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "var(--border-secondary)", // Optional: Change border color when focused
                },
              }}
              {...register("code", {
                required: "Code is required",
              })}
            />
            {errors.code && (
              <Typography
                variant="caption"
                color="error"
                sx={{ mt: 1, color: "red" }}
              >
                {errors.code.message}
              </Typography>
            )}
          </FormControl>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={isLoading}
            className="!bg-buttonFont hover:!bg-buttonHoverBg h-10 disabled:!bg-buttonHoverBg !text-hoverFont"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                Check Code...
                <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24">
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
              </span>
            ) : (
              "Check Code"
            )}
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default Code;
