import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { Button, TextField, Typography, Box, Stack } from "@mui/material";
import { AuthContext } from "../../../auth/AuthContextProvider";

import image from "../../../assets/loginPage_image.png"
import { style } from "./RegisterPage";
import { useSnackbar } from "notistack";
import { success } from "../../../theme/palette";


const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required")
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,"invalid email"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/\d/, "Password must contain at least one digit")
    .matches(/[@$!%*?&#]/, "Password must contain at least one special character")
    .required("Password is required"),
});
export const buttonStyle={
  mt: 2,
  borderRadius: "10px",
  position: "relative",
  zIndex: 1,
  color:"white",
  "&:before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: "10px",
    background: `linear-gradient(to right,rgb(200, 250,250), rgb(26,27,152))`,
    zIndex: -1, 
  },
}


const Login = () => {
  const {enqueueSnackbar}=useSnackbar()
  const navigate = useNavigate();
  const {login ,user}=useContext(AuthContext)
  
   

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    
      var success=await login(data)
      console.log(success);
      
      if(success){
        enqueueSnackbar("login success", {variant:"success"})
      navigate("/orchasp/careers/list"); 
      }
   
  };
 


  return (
   <Box sx={{
   height:"91.5vh",
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    backgroundImage:`url(${image})`,
    backgroundRepeat:"no-repeat",
    backgroundSize:"cover"
   }}>
       <Stack sx={{
      backdropFilter: "blur(10px)",
      background: "rgba(255, 255, 255, 0.2)", 
      border:"2px solid transparent",
      borderRadius: "20px",
     
      
    }}>
      <Box
        sx={{
          width: 400,
          padding: "40px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
        }}
      >
        <Typography variant="h4" gutterBottom color="white" textAlign={"center"}>
          Login
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
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
            style:{
              color:"white"
            }
           }}
           InputLabelProps={{
            style:{
              color:"white"
            }
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
              style:{
                color:"white"
              }
             }}
             InputLabelProps={{
              style:{
                color:"white"
              }
             }}
          />

          <Button variant="contained" type="submit"  fullWidth sx={buttonStyle}>
            Login
          </Button>
          {success &&(<Typography color="red">{user?.message}</Typography>)}
        </form>

        <Typography variant="body2" sx={{ mt: 2 ,color:"white"}}>
          Don't have an account ? <Typography  component={Link} to="/register" sx={{ color: 'whitesmoke', "&:hover":{
            color:"red"
          } }} >Register here</Typography>
        </Typography>
      </Box>
    </Stack>
   </Box>
  );
};

export default Login;

