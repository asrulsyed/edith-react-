import {
  Email,
  Google,
  Twitter,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import {
  Button,
  Divider,
  Box,
  Typography,
  Checkbox,
  FormControlLabel,
  InputAdornment,
  FormControl,
  OutlinedInput,
  InputLabel,
  IconButton,
} from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router-dom";

interface SignInProps {
  email: string;
  password: string;
  rememberMe: boolean;
}

const SignIn = () => {
  // const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInProps>({
    defaultValues: {
      rememberMe: false,
    },
  });

  const onSubmit = (data: SignInProps) => {
    console.log(data);
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
                  <IconButton edge="end">
                    <Email />
                  </IconButton>
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

          <FormControlLabel
            control={<Checkbox {...register("rememberMe")} defaultChecked />}
            label="Remember me"
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            className="bg-blue-600 hover:bg-blue-700 h-10"
          >
            Sign In
          </Button>
        </form>

        <Divider>or</Divider>

        <div className="space-y-2">
          <Button
            variant="outlined"
            fullWidth
            startIcon={<Google />}
            onClick={() => {
              /* Handle Google Sign In */
            }}
            className="border-gray-300"
          >
            Continue with Google
          </Button>

          <Button
            variant="outlined"
            fullWidth
            startIcon={<Twitter />}
            onClick={() => {
              /* Handle Twitter Sign In */
            }}
            className="border-gray-300"
          >
            Continue with Twitter
          </Button>
        </div>
      </Box>
    </Box>
  );
};

export default SignIn;
