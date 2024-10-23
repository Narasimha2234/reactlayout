import React, { useContext, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { Button, TextField, Typography, Box, Stack, CircularProgress } from "@mui/material";
import { AuthContext } from "../../../auth/AuthContextProvider";
import image from "../../../assets/registerPage_image.png"
import { useSnackbar } from "notistack";
import { buttonStyle } from "./Login";

export const style = {
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'whitesmoke', 
    },
    '&:hover fieldset': {
      borderColor: 'white', 
    },
    '&.Mui-focused fieldset': {
      borderColor: 'white', 
    },
    '&.Mui-error fieldset': {
      borderColor: 'whitesmoke', 
    },
  },
  '& .MuiInputLabel-root': {
    color: 'whitesmoke', 
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: 'white', 
  },
  '& .MuiInputLabel-root.Mui-error': {
    color: 'white', 
  },
  '& .MuiFormHelperText-root': {
    color: 'whitesmoke', 
  },
  '& .MuiFormHelperText-root.Mui-error': {
    color: 'red', 
  }
};

const schema = yup.object().shape({
  username: yup.string().required("Username is required"),
  email: yup.string().email("Invalid email format").required("Email is required").matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,"invalid email"),
  mobile: yup
    .string()
    .matches(/^([789]{1})([\d]{3})[(\D\s)]?[\d]{3}[(\D\s)]?[\d]{3}$/, "Invalid mobile number")
    .required("Mobile number is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/\d/, "Password must contain at least one digit")
    .matches(/[@$!%*?&#]/, "Password must contain at least one special character")
    .required("Password is required"),
  confirmPwd: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

const Register = () => {
  const [message, setMessage] = useState("");
  const [statusCode, setStatusCode] = useState();
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { registerUser } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Trigger Snackbar when statusCode or message changes
  useEffect(() => {
    if (message && statusCode) {
      enqueueSnackbar(message, { variant: statusCode === 200 ? "success" : "error" });
      if (statusCode === 200) {
        navigate("/login");
      }
    }
  }, [message, statusCode, enqueueSnackbar, navigate]);

  const onSubmit = async (data) => {
    setLoading(true);
    const response = await registerUser(data);
    
    setMessage(response?.data?.body?.message);
    setStatusCode(response.data.statusCodeValue);
    
    setLoading(false); 
  };

  return (
    <Box
      sx={{
        height: "93.2vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: `url(${image})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        mt: -1.5,
      }}
    >
      <Stack
        sx={{
          backdropFilter: "blur(10px)",
          background: "rgba(255, 255, 255, 0.2)",
          borderRadius: "20px",
        }}
      >
        <Box
          sx={{
            width: 400,
            padding: "20px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
          }}
        >
          <Typography variant="h4" gutterBottom color="white" textAlign={"center"}>
            Register
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              sx={style}
              label="Username"
              variant="outlined"
              fullWidth
              margin="normal"
              {...register("username")}
              error={!!errors.username}
              helperText={errors.username?.message}
              InputProps={{
                style: {
                  color: "white",
                },
              }}
              InputLabelProps={{
                style: {
                  color: "white",
                },
              }}
            />

            <TextField
              sx={style}
              label="Email"
              type="email"
              variant="outlined"
              fullWidth
              margin="normal"
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
              InputProps={{
                style: {
                  color: "white",
                },
              }}
              InputLabelProps={{
                style: {
                  color: "white",
                },
              }}
            />

            <TextField
              sx={style}
              label="Mobile"
              variant="outlined"
              fullWidth
              margin="normal"
              {...register("mobile")}
              error={!!errors.mobile}
              helperText={errors.mobile?.message}
              InputProps={{
                style: {
                  color: "white",
                },
              }}
              InputLabelProps={{
                style: {
                  color: "white",
                },
              }}
            />

            <TextField
              sx={style}
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password?.message}
              InputProps={{
                style: {
                  color: "white",
                },
              }}
              InputLabelProps={{
                style: {
                  color: "white",
                },
              }}
            />

            <TextField
              sx={style}
              label="Confirm Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              {...register("confirmPwd")}
              error={!!errors.confirmPwd}
              helperText={errors.confirmPwd?.message}
              InputProps={{
                style: {
                  color: "white",
                },
              }}
              InputLabelProps={{
                style: {
                  color: "white",
                },
              }}
            />

            <Button variant="contained" type="submit" fullWidth sx={buttonStyle}>
              {loading ? <CircularProgress color="inherit" size={24} /> : "Register"}
            </Button>
            {message && statusCode!==200&&(<Typography color={`${statusCode===200?"green":"red"}`}>{message}</Typography>)}
          </form>

          <Typography variant="body2" sx={{ mt: 1, color: "white" }}>
            Already have an account?{" "}
            <Typography component={Link} to="/login" sx={{ color: "whitesmoke", "&:hover": { color: "red" } }}>
              Login here
            </Typography>
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
};

export default Register;
