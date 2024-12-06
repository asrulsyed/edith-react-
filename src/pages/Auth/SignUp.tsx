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
  const { toast } = useToast();

  const onSubmit = async (data: SignUpProps) => {
    setIsLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/auth/magic-link`,
        { name: data.name, destination: data.email },
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
            <InputLabel htmlFor="outlined-adornment-password">Name</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type="text"
              error={!!errors.name}
              endAdornment={
                <InputAdornment position="end">
                  <Person2 />
                </InputAdornment>
              }
              label="Name"
              {...register("name", {
                required: "Name is required",
              })}
            />
            {errors.name && (
              <Typography variant="caption" color="error" sx={{ mt: 1 }}>
                {errors.name.message}
              </Typography>
            )}
          </FormControl>

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
        <div className="space-y-2">
          <div>
            <a href={`${import.meta.env.VITE_BACKEND_URL}/auth/google`}>
              Login With Google
            </a>
          </div>
          <div>
            <a href="http://127.0.0.1:3500/auth/twitter">Login With Twitter</a>
          </div>
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
