import { Link, useNavigate } from "react-router-dom";
import { Email, Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  Divider,
  Box,
  Typography,
  InputAdornment,
  FormControl,
  OutlinedInput,
  InputLabel,
  IconButton,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import {
  GoogleLogin,
  GoogleOAuthProvider,
  CredentialResponse,
} from "@react-oauth/google";
import { useToast } from "@/hooks/use-toast";

interface SignUpProps {
  email: string;
  password: string;
}

const SignUp = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpProps>({});

  const [isLoading, setIsLoading] = useState(false);
  const { setToken, setUser, logined, setLogined } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (logined) navigate("/home");
  }, [logined, navigate]);

  const onSubmit = async (data: SignUpProps) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/user/register`,
        data
      );
      if (response.status === 200) {
        setToken(response.data.token);
        setUser(response.data.user);
        navigate("/user/verify");
      } else {
        toast({
          variant: "destructive",
          description: response.data,
        });
      }
    } catch (error) {
      console.error("Registration error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleGoogleSuccess = async (
    credentialResponse: CredentialResponse
  ) => {
    if (!credentialResponse.credential) return;

    setIsLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/user/google-login`,
        {
          credential: credentialResponse.credential,
        }
      );
      console.log(response);
      if (response.status === 200) {
        setLogined(true);
        setUser(response.data.user);
        localStorage.setItem("EDITH_token", response.data.token);
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.token}`;
        navigate("/home");
      }
    } catch (error) {
      console.error("Google Login Error:", error);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <Box className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <Typography variant="h4" className="!mb-5 !font-bold !font-pavelt">
        E.D.I.T.H
      </Typography>
      <Box className="w-full max-w-sm space-y-4 p-6">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 flex flex-col items-start"
        >
          <FormControl sx={{ width: "100%" }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Email</InputLabel>
            <OutlinedInput
              id="outlined-adornment-email"
              type="email"
              error={!!errors.email}
              endAdornment={
                <InputAdornment position="end">
                  <Email />
                </InputAdornment>
              }
              label="Email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && (
              <Typography variant="caption" color="error" sx={{ mt: 1 }}>
                {errors.email.message}
              </Typography>
            )}
          </FormControl>

          <FormControl sx={{ width: "100%" }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              error={!!errors.password}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label={
                      showPassword
                        ? "hide the password"
                        : "display the password"
                    }
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    onMouseUp={handleMouseUpPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters long",
                },
              })}
            />
            {errors.password && (
              <Typography variant="caption" color="error" sx={{ mt: 1 }}>
                {errors.password.message}
              </Typography>
            )}
          </FormControl>

          <Button
            type="submit"
            variant="contained"
            fullWidth
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
                Signing up...
              </span>
            ) : (
              "Sign Up"
            )}
          </Button>
        </form>

        <Divider>or</Divider>

        <div className="space-y-4">
          <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => {
                console.error("Google Login Error");
              }}
              theme="outline"
              size="large"
              width="100%"
              text="continue_with"
            />
          </GoogleOAuthProvider>

        </div>

        <Typography variant="body2" className="text-center mt-4">
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
