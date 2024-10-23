import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Box, Typography, TextField, Button,  Stack, CircularProgress } from "@mui/material";
import { AttachFile } from "@mui/icons-material";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";

import image from "../../../assets/applyForm.png";
import { style } from "../public/RegisterPage";
import { AuthContext } from "../../../auth/AuthContextProvider";
import { applyForm } from "../../../axios/utils";
import { useSnackbar } from "notistack";
import { buttonStyle } from "../public/Login";

const schema = yup.object().shape({
  name: yup.string().required("Full Name is required"),
  email: yup.string().email("Invalid email format").required("Email is required"),
  mobile: yup
    .string()
    .matches(/^[6-9]\d{9}$/, "Invalid phone number")
    .required("Phone number is required"),
  qualification: yup.string().required("Please enter your qualifications"),
  skills: yup.string().required(" please enter your skills"),
  jobName: yup.string().required("Job Name is required"),
  resume: yup
    .mixed()
    .test("required", "Resume is required", (value) => value && value.length)
    .test("fileSize", "File size too large", (value) =>
      value && value[0] ? value[0].size <= 2 * 1024 * 1024 : true
    )
    .test("fileType", "Only PDF files are allowed", (value) =>
      value && value[0] ? value[0].type === "application/pdf" : true
    ),
});

const JobApplicationForm = () => {
  const[loading,setLoading]=useState(false)
  const {user} =useContext(AuthContext)
  const[params]=useSearchParams()
  const jobId = params.get('JobId');
  console.log(jobId);
  
  const jobName=params.get("jobName")
  const navigate = useNavigate();
  const [resumeName, setResumeName] = useState("");
const {enqueueSnackbar}=useSnackbar()
const initialValue={
  name:user.userName,
  email:user.sub,
  mobile:user.mobile,
  qualification:"",
  jobName:jobName,
  skills:"",
  resume:null
}
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues:initialValue,
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    setLoading(true)
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("mobile", data.mobile);
    formData.append("qualification", data.qualification);
    formData.append("skills", data.skills);
    formData.append("jobId",jobId)
    formData.append("jobName", data.jobName);
    formData.append("resume", data.resume[0]);

    try {
     const response= await applyForm(formData);
     setLoading(false)
      enqueueSnackbar("Application Submitted Succussfully",{variant:"success"})
      navigate("/");
    } catch (error) {
     enqueueSnackbar("Failed to submit the application.",{variant:"error"})
    }
  };

  const handleResumeChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setResumeName(file.name);
      setValue("resume", e.target.files);
    }
  };

  return (
    <Box
      sx={{
       mt:-3,
        width:"100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: `url(${image})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        
      }}
    >
      <Stack sx={{
       
        backdropFilter: "blur(10px)",
        background: "rgba(255, 255, 255, 0.2)",
        borderRadius: "20px",
        margin:"40px"
      }}>
        <Box
          sx={{
            
            width: 400,
           padding:"40px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
          }}
        >
          <Typography variant="h4" gutterBottom color="white" textAlign={"center"}>
            Apply here 
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            sx={style}
              label="Job Name"
              variant="outlined"
              fullWidth
              margin="normal"
              {...register("jobName")}
              error={!!errors.jobName}
              helperText={errors.jobName?.message}
              InputProps={{ style: { color: "white" } }}
              InputLabelProps={{ style: { color: "white" } }}
            />
            <TextField
           sx={style}
              label="Candidate Name"
              variant="outlined"
              fullWidth
              margin="normal"
              {...register("name")}
              error={!!errors.name}
              helperText={errors.name?.message}
              InputProps={{ style: { color: "white" } }}
              InputLabelProps={{ style: { color: "white" } }}
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
              InputProps={{ style: { color: "white" } }}
              InputLabelProps={{ style: { color: "white" } }}
            />
            <TextField
            sx={style}
              label="Phone Number"
              variant="outlined"
              fullWidth
              margin="normal"
              {...register("mobile")}
              error={!!errors.mobile}
              helperText={errors.mobile?.message}
              InputProps={{ style: { color: "white" } }}
              InputLabelProps={{ style: { color: "white" } }}
            />
           
            <TextField
            sx={style}
              label="skills"
              variant="outlined"
              fullWidth
             
              margin="normal"
              {...register("skills")}
              error={!!errors.skills}
              helperText={errors.skills?.message}
              InputProps={{ style: { color: "white" } }}
              InputLabelProps={{ style: { color: "white" } }}
            />
             <TextField
            sx={style}
              label="Qualification"
              variant="outlined"
              fullWidth
              multiline
              margin="normal"
              {...register("qualification")}
              error={!!errors.qualification}
              helperText={errors.qualification?.message}
              InputProps={{ style: { color: "white" } }}
              InputLabelProps={{ style: { color: "white" } }}
            />
            
            
            <Button
              variant="contained"
              component="label"
              fullWidth
              sx={{ mt: 2 ,background: "linear-gradient(to right, rgb(26,27,152), rgb(200, 250,250))" , borderRadius:"10px"}}
              startIcon={<AttachFile />}
            >
              Upload Resume
              <input
                type="file"
                hidden
                accept="application/pdf"
                onChange={handleResumeChange}
              />
            </Button>
            {resumeName && (
              <Typography variant="body2" mt={1} sx={{ color: "white" }}>
                 {resumeName}
              </Typography>
            )}
            {errors.resume && (
              <Typography color="error" variant="body2">
                {errors.resume.message}
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={buttonStyle}
            >
              {loading?<CircularProgress color="white"/>:"submit"}
            </Button>
          </form>
        </Box>
      </Stack>
    </Box>
  );
};

export default JobApplicationForm;
