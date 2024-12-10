import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Verify = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Typography variant="h5" className="!mb-10">
        Verify your email to continue.
      </Typography>
      <Button
        type="button"
        variant="contained"
        onClick={()=> navigate("/user/signin")}
        className="bg-blue-600 hover:bg-blue-700 h-10 disabled:bg-blue-400"
      >
        Back to Login
      </Button>
    </div>
  );
};

export default Verify;
