import { useTheme } from '@emotion/react'
import { Box, Button, Stack, TextField, Typography } from '@mui/material'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as YUP from "yup"
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, useNavigate } from 'react-router-dom'
import { primary } from './../../../theme/palette';



const Login = () => {
  const navigate=useNavigate()
  const theme=useTheme()
  const { object, string } =YUP
  const initialValues={
    userName:"Narasimha",
    password:"123@admin"
  }
  const validation = object({
    userName: string().required("enter userName"),
   password:string().required("enter password").min(8,"requires min 8 charecters lenght")
  });

  const {register,handleSubmit,formState}=useForm({
    defaultValues:initialValues,
    resolver:yupResolver(validation)
  })
  
  const submitHandler=(data)=>{
    if(data.userName==="Narasimha" && data.password==="123@admin"){
      navigate("/dashboard")
    }
    
    
  }
  return (
    <Box sx={{height:"100%", width:"100%", display:"flex",justifyContent:"center",alignItems:"center"}}>
      
     <Box sx={{ width:"40%", p:5}}>
     <Typography textAlign={"center"} variant='h5' color={theme.palette.grey[800]} gutterBottom>Login</Typography>
      <Box component={"form"} onSubmit={handleSubmit(submitHandler)}>
        <Stack mb={2}>
          <Typography>user name</Typography>
          <TextField size='small' {...register("userName")}/>
          {!!formState.errors.userName?.message &&(
            <Typography color={theme.palette.error.main}>{formState.errors.userName?.message}</Typography>
          )}
        </Stack>
        <Stack>
          <Typography>password</Typography>
          <TextField size='small' {...register("password")}/>
          {!!formState.errors.password?.message &&(
            <Typography color={theme.palette.error.main}>{formState.errors.password?.message}</Typography>
          )}
        </Stack>
       <Box textAlign={"center"} mt={2}>
        <Button variant='outlined' type='submit'>login</Button>
        <Typography>don't have account? <Typography component={Link} to={"/register"} sx={{textDecoration:"none" , color:theme.palette.primary.main}}>register</Typography></Typography>
       </Box>
      </Box>
     </Box>
    
    </Box>
  )
}

export default Login