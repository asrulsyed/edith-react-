import { useToast } from "@/hooks/use-toast";
import { MailOutline, PersonOutline } from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

interface SignUpProps {
  name: string;
  email: string;
}

const SignUp = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpProps>({});

  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState<boolean>(false);
  const [isTwitterLoading, setIsTwitterLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const onSubmit = async (data: SignUpProps) => {
    setIsLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/auth/magic-link`,
        {
          name: data.name,
          destination: data.email,
          referralCode: localStorage.getItem("EDITH_code"),
        }
      );
      if (res.status === 200) {
        navigate("/user/verify");
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

  return (
    <Box className="flex flex-col items-center justify-center min-h-screen bg-mainBg font-Sofia text-buttonFont">
      {/* logo */}
      <button
        className="flex items-end bg-transparent border-none outline-none focus:outline-none p-0 !mb-5"
        onClick={() => navigate("/")}
      >
        <img
          src="/logo-light.png"
          alt="logo"
          className="w-[22px] h-[26px] mr-0.5"
        />
        <span className="text-[40px] font-bold leading-[24px]">
          .D.I.T.H
        </span>
      </button>

      {/* form */}
      <Box className="w-full max-w-sm p-6 space-y-4">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-start space-y-4"
        >
          <FormControl
            sx={{
              width: "100%",
              backgroundColor: "var(--bg-input)",
            }}
            variant="outlined"
          >
            <InputLabel
              htmlFor="outlined-adornment-password"
              sx={{
                color: "var(--font-button)",
                "&.Mui-focused": {
                  color: "var(--font-button)",
                },
              }}
            >
              Name
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type="text"
              error={!!errors.name}
              endAdornment={
                <InputAdornment position="end">
                  <PersonOutline sx={{ color: "var(--font-button)" }} />
                </InputAdornment>
              }
              label="Name"
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
              {...register("name", {
                required: "Name is required",
                pattern: {
                  value: /^[A-Za-z\s.]+$/,
                  message: "Invalid name",
                },
              })}
            />
            {errors.name && (
              <Typography
                variant="caption"
                color="error"
                sx={{ pt: 1, color: "red", bgcolor: "var(--bg-main)" }}
              >
                {errors.name.message}
              </Typography>
            )}
          </FormControl>

          <FormControl
            sx={{
              width: "100%",
              backgroundColor: "var(--bg-input)",
            }}
            variant="outlined"
          >
            <InputLabel
              htmlFor="outlined-adornment-password"
              sx={{
                color: "var(--font-button)",
                "&.Mui-focused": {
                  color: "var(--font-button)",
                },
              }}
            >
              Email
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-email"
              type="email"
              error={!!errors.email}
              endAdornment={
                <InputAdornment position="end">
                  <MailOutline sx={{ color: "var(--font-button)" }} />
                </InputAdornment>
              }
              label="Email"
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
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && (
              <Typography
                variant="caption"
                color="error"
                sx={{ pt: 1, color: "red", bgcolor: "var(--bg-main)" }}
              >
                {errors.email.message}
              </Typography>
            )}
          </FormControl>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={isLoading}
            className="!bg-buttonFont hover:!bg-buttonHoverBg h-10 disabled:!bg-buttonHoverBg !text-hoverFont !text-sm"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                Signing up...
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
              "Sign Up"
            )}
          </Button>
        </form>
        <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
          <Divider
            sx={{
              flex: 1,
              color: "var(--font-primary)",
              "&.MuiDivider-root": {
                borderColor: "var(--border-secondary)",
              },
            }}
          />
          <Typography
            sx={{ mx: 2, whiteSpace: "nowrap", color: "var(--font-primary)" }}
          >
            OR
          </Typography>
          <Divider
            sx={{
              flex: 1,
              color: "var(--font-primary)",
              "&.MuiDivider-root": {
                borderColor: "var(--border-secondary)",
              },
            }}
          />
        </Box>

        {/* Social login */}
        <div className="space-y-2">
          {/* Google login */}
          <Button
            variant="contained"
            fullWidth
            disabled={isGoogleLoading}
            onClick={() => {
              setIsGoogleLoading(true);
              const additionalData = { referralCode: localStorage.getItem('EDITH_code') || '' };
              const queryString = new URLSearchParams(additionalData).toString();
              window.location.href = `${
                import.meta.env.VITE_BACKEND_URL
              }/auth/google?${queryString}`;
            }}
            className="!bg-buttonFont hover:!bg-buttonHoverBg h-10 disabled:!bg-buttonHoverBg !text-hoverFont !text-sm"
          >
            {isGoogleLoading ? (
              <>
                <span className="flex items-center gap-2">
                  <img src="/google.png" className="w-6 h-6" />
                  Login With Google...
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
              </>
            ) : (
              <span className="flex items-center gap-2">
                <img src="/google.png" className="w-6 h-6" />
                Login With Google
              </span>
            )}
          </Button>
          {/* Twitter login */}
          <Button
            variant="contained"
            fullWidth
            disabled={isTwitterLoading}
            onClick={() => {
              setIsTwitterLoading(true);
              const additionalData = { referralCode: localStorage.getItem('EDITH_code') || '' };
              const queryString = new URLSearchParams(additionalData).toString();
              window.location.href = `${
                import.meta.env.VITE_BACKEND_URL
              }/auth/twitter?${queryString}`;
            }}
            className="!bg-buttonFont hover:!bg-buttonHoverBg h-10 disabled:!bg-buttonHoverBg !text-hoverFont !text-sm"
          >
            {isTwitterLoading ? (
              <>
                <span className="flex items-center gap-2">
                  <img src="/twitter.png" className="w-6 h-6" />
                  Login With Twitter...
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
              </>
            ) : (
              <span className="flex items-center gap-2">
                <img src="/twitter.png" className="w-6 h-6" />
                Login With Twitter
              </span>
            )}
          </Button>
        </div>

        {/* Navigate sign in if you already have an account */}
        <Typography
          variant="body2"
          className="mt-4 text-center "
        >
          Already have an account?{" "}
          <Link to="/user/signin" className="text-blue-600 hover:text-blue-700">
            Sign In
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default SignUp;
