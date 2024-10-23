import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import WorkIcon from '@mui/icons-material/Work';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import useFetchJobById from '../../../axios/useFetchJobById';
import { buttonStyle } from '../public/Login';

const JobDetail = () => {
  const navigate = useNavigate();
  const [Params] = useSearchParams();
  
  const jobId = Params.get('jobId');
  const jobName = Params.get('jobName');
  const { job, isLoading, error } = useFetchJobById(jobId);
  
  const handleNavigation = (jobName, jobId) => {
   
    
    navigate(`../apply?JobId=${jobId}&jobName=${jobName}`);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  
  if (error) {
    return <div>There is some error fetching job details</div>;
  }

  return (
    <Box
      sx={{
        padding: '32px',
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        boxShadow: '0 6px 20px rgba(0, 0, 0, 0.1)',
        maxWidth: '600px',
        margin: 'auto',
      }}
    >
      <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1976d2', mb: 2, display: 'flex', alignItems: 'center' }}>
        <WorkIcon sx={{ mr: 1 }} /> {job.jobName}
      </Typography>

      <Typography variant="body1" sx={{ mb: 2 }}>
        {job.jobRole}
      </Typography>

      <Typography variant="body2" sx={{ color: '#555', display: 'flex', alignItems: 'center' }}>
        <LocationOnIcon sx={{ mr: 1 }} /> {job.jobLocation}
      </Typography>

      <Typography variant="h6" sx={{ mt: 3, mb: 1 }}>
        Requirements:
      </Typography>

      <List>
        <ListItem>
          <ListItemIcon>
            <AssignmentTurnedInIcon />
          </ListItemIcon>
          <ListItemText primary={`Qualification: ${job.educationalQualification}`} />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <AssignmentTurnedInIcon />
          </ListItemIcon>
          <ListItemText primary={`Skills Required: ${job.skillSet}`} />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <AssignmentTurnedInIcon />
          </ListItemIcon>
          <ListItemText primary={`Year of Passing: ${job.yop}`} />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <AssignmentTurnedInIcon />
          </ListItemIcon>
          <ListItemText primary={`No. of Openings: ${job.noOfOpenings}`} />
        </ListItem>
      </List>

      <Button
        variant="outlined"
        sx={buttonStyle}
        onClick={() => handleNavigation(jobName, job.jobId)} // Corrected function call
      >
        Apply To This Job
      </Button>
    </Box>
  );
};

export default JobDetail;
