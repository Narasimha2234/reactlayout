
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Button,  MenuItem,  Stack, TextField, Typography, useTheme } from '@mui/material'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import * as YUP from "yup"
const RegisterPage = () => {
    const navigate=useNavigate()
    const theme=useTheme()
    const { object, string,  } = YUP
    const validationSchema = object({
        userName: string().required("enter your userName"),
        gender:string().required("select gender"),
        phoneNumber: string().required("enter your mobile number").matches(/^[6-9]\d{9}$/, "Enter a valid 10-digit phone number"),
        Password: string().required("enter password").min(8, "requires minimum 8 charecters long").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character")
    })
    const initialValues = {
        userName: "Narasimha",
        gender:"Male",
        phoneNumber: "9666164055",
        Password: "123@Admin"
    }

    const { handleSubmit, register, formState } = useForm({
        defaultValues: initialValues,
        resolver: yupResolver(validationSchema)
    })
     const submitHandler=(data)=>{
        console.log(formState);  
        //    navigate("/login") 
     }
     

    return (
        <Box sx={{ height: "100%", width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Box sx={{ width: "40%" }} component={"form"} onSubmit={handleSubmit(submitHandler)}>
                <Typography textAlign={"center"} variant='h5'>Registration page</Typography>
                <Stack mb={1}>
                    <Typography gutterBottom>user name</Typography>
                    <TextField size='small' {...register("userName")}
                        error={!!formState.errors.userName}
                        helperText={formState.errors.userName?.message}
                    />
                </Stack>
                <Stack mb={1}>
                    <Typography gutterBottom>gender</Typography>
                    <TextField size='small' {...register("gender")}
                          select
                          
                        error={!!formState.errors.gender}
                        helperText={formState.errors.gender?.message}
                    >
                        
                        <MenuItem value="Male" >Male</MenuItem>
                        <MenuItem value="FeMale">FeMale</MenuItem>
                        <MenuItem value="Other">Other</MenuItem>
                    </TextField>
                </Stack>
                <Stack mb={1}>
                    <Typography gutterBottom>phone number</Typography>
                    <TextField size='small' {...register("phoneNumber")}
                       
                        error={!!formState.errors.phoneNumber}
                        helperText={formState.errors.phoneNumber?.message}
                    />
                   
                </Stack>
               
                <Stack mb={1}>
                    <Typography gutterBottom>password</Typography>
                    <TextField size='small' {...register("Password")}
                        error={formState.errors.Password}
                        helperText={formState.errors.Password?.message}
                    />
                </Stack>
                <Box textAlign={"center"} mt={2}>
                    <Button variant='outlined' type='submit'>Register</Button>
                    <Typography>Already have account?  <Typography component={Link} to={"/login"} sx={{ textDecoration: "none", color: theme.palette.primary.main }}>login</Typography></Typography>
                </Box>
            </Box>
        </Box>
    )
}

export default RegisterPage