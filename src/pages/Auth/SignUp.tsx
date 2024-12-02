import { Link } from "react-router-dom";
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

interface SignUpProps {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreePolicy: boolean;
}

const SignUp = () => {
  // const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignUpProps>({
    defaultValues: {
      agreePolicy: false,
    },
  });

  const onSubmit = (data: SignUpProps) => {
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
            <InputLabel htmlFor="outlined-adornment-firstName">
              First Name
            </InputLabel>
            <OutlinedInput
              error={!!errors.firstName}
              label="First Name"
              {...register("firstName", {
                required: "First name is required",
                pattern: {
                  value: /^[A-Z][a-z]+$/i,
                  message: "Invalid name",
                },
              })}
            />
            {errors.firstName && (
              <Typography variant="caption" color="error" sx={{ mt: 1 }}>
                {errors.firstName.message}
              </Typography>
            )}
          </FormControl>
          <FormControl sx={{ width: "100%" }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-lastName">
              Last Name
            </InputLabel>
            <OutlinedInput
              error={!!errors.lastName}
              label="Last Name"
              {...register("lastName", {
                required: "Last name is required",
                pattern: {
                  value: /^[A-Z][a-z]+$/i,
                  message: "Invalid name",
                },
              })}
            />
            {errors.lastName && (
              <Typography variant="caption" color="error" sx={{ mt: 1 }}>
                {errors.lastName.message}
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

          <FormControl sx={{ width: "100%" }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-confirmPassword">
              Confirm Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-confirmPassword"
              type={showPassword ? "text" : "password"}
              error={!!errors.confirmPassword}
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
              label="Confirm Password"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === watch("password") || "Passwords do not match",
              })}
            />
            {errors.confirmPassword && (
              <Typography variant="caption" color="error" sx={{ mt: 1 }}>
                {errors.confirmPassword.message}
              </Typography>
            )}
          </FormControl>

          <FormControlLabel
            control={<Checkbox {...register("agreePolicy")} defaultChecked />}
            label="I agree to the Privacy Policy"
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            className="bg-blue-600 hover:bg-blue-700 h-10"
          >
            Sign Up
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

        <Typography variant="body2" className="text-center mt-4">
          Already have an account?{" "}
          <Link to="/signin" className="text-blue-600 hover:text-blue-700">
            Sign In
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default SignUp;
