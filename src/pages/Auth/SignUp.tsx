import { useToast } from "@/hooks/use-toast";
import { Email, Person2 } from "@mui/icons-material";
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
        { name: data.name, destination: data.email }
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
    <Box className="flex flex-col items-center justify-center min-h-screen bg-backgroundPrimary">
      {/* logo */}
      <Button
        className="flex items-center gap-1.5 bg-backgroundSecondary border-none outline-none focus:outline-none p-0 !mb-5"
        onClick={() => navigate("/")}
      >
        <img src="/logo.png" alt="logo" className="w-9 h-9" />
        <Typography
          variant="h4"
          className="text-fontPrimary !font-pavelt !font-bold"
        >
          E.D.I.T.H
        </Typography>
      </Button>

      {/* form */}
      <Box className="w-full max-w-sm space-y-4 p-6">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 flex flex-col items-start"
        >
          <FormControl
            sx={{
              width: "100%",
              backgroundColor: "var(--background-secondary)",
            }}
            variant="outlined"
          >
            <InputLabel
              htmlFor="outlined-adornment-password"
              sx={{
                color: "var(--font-tertiary)",
                "&.Mui-focused": {
                  color: "var(--font-primary)",
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
                  <Person2 sx={{ color: "var(--font-tertiary)" }} />
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
                sx={{ mt: 1, color: "red" }}
              >
                {errors.name.message}
              </Typography>
            )}
          </FormControl>

          <FormControl
            sx={{
              width: "100%",
              backgroundColor: "var(--background-secondary)",
            }}
            variant="outlined"
          >
            <InputLabel
              htmlFor="outlined-adornment-password"
              sx={{
                color: "var(--font-tertiary)",
                "&.Mui-focused": {
                  color: "var(--font-primary)",
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
                  <Email sx={{ color: "var(--font-tertiary)" }} />
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
                sx={{ mt: 1, color: "red" }}
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
            className="!bg-buttonTertiary hover:!bg-buttonQuaternary h-10 disabled:!bg-buttonQuaternary !text-fontSecondary"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                Signing up...
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
                borderColor: "var(--border-primary)",
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
                borderColor: "var(--border-primary)",
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
              window.location.href = `${
                import.meta.env.VITE_BACKEND_URL
              }/auth/google`;
            }}
            className="!bg-buttonTertiary hover:!bg-buttonQuaternary h-10 disabled:!bg-buttonQuaternary !text-fontSecondary"
          >
            {isGoogleLoading ? (
              <>
                <span className="flex items-center gap-2">
                  <img src="/google.png" className="w-6 h-6" />
                  Login With Google...
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
              window.location.href = `${
                import.meta.env.VITE_BACKEND_URL
              }/auth/twitter`;
            }}
            className="!bg-buttonTertiary hover:!bg-buttonQuaternary h-10 disabled:!bg-buttonQuaternary !text-fontSecondary"
          >
            {isTwitterLoading ? (
              <>
                <span className="flex items-center gap-2">
                  <img src="/twitter.png" className="w-6 h-6" />
                  Login With Twitter...
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
          className="text-center mt-4 text-fontTertiary"
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
