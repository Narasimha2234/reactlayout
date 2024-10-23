import React from 'react';
import { Box, Typography, Button, List, Card, CardContent, CardActions, Divider } from '@mui/material';
import { motion } from 'framer-motion';
import useFetchJobs from '../../../axios/useFetchJobs';
import { useNavigate } from 'react-router-dom';
import { buttonStyle } from '../public/Login';
import Carousel from '../common/Carousel';
import homeBanner1 from "../../../assets/homeBanner1.jpg"
import homeBanner2 from "../../../assets/homeBanner2.jpg"
import homeBanner3 from "../../../assets/homeBanner3.jpg"
import homeBanner4 from "../../../assets/homeBanner4.jpg"

const JobList = () => {
  const navigate = useNavigate();
  const { jobs, isLoading, error } = useFetchJobs();



  const handleNavigate = (jobId,jobName) => {
    navigate(`../view?jobId=${jobId}&jobName=${jobName}`);
  };

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography>Error loading jobs: {error.message}</Typography>;
  }

  return (
   <Box>
   <Box mt={-2}>
   <Carousel items={[homeBanner1,homeBanner2,homeBanner3,homeBanner4]} isVideo={false} />
   </Box>
       <Box
      sx={{
        width: '70%',
        padding: '40px',
        backgroundColor: '#f0f4f7',
        borderRadius: '24px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
        margin:"auto",
        mt:2
      }}
    >
      <Typography variant="h3" align="center" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2', mb: 4 }}>
        Current Job Openings
      </Typography>
      <List>
        {jobs.data.map((job, index) => (
          <motion.div
            whileHover={{ scale: 1.01 }}
            transition={{ type: 'spring', stiffness: 200 }}
            key={index}
          >
            <Card
              sx={{
                marginBottom: '32px',
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: '0 6px 20px rgba(0, 0, 0, 0.1)',
                backgroundColor: '#ffffff',
                '&:hover': {
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
                },
              }}
            >
              <CardContent>
                <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#37474f', mb: 2 }}>
                  {job.jobName}
                </Typography>
                <Typography variant="body1" sx={{ color: '#616161', lineHeight: '1.6' }}>
                  Educational Qualification: {job.educationalQualification}
                </Typography>
              </CardContent>
              <Divider />
              <CardActions sx={{ justifyContent: 'space-between', padding: '16px' }}>
                <Typography variant="body2" sx={{ color: '#90a4ae' }}>
                  Location: {job.jobLocation}
                </Typography>
                <Button
                  variant="contained"
                  size="large"
                  sx={buttonStyle}
                  onClick={() => handleNavigate(job.id,job.jobName)}
                >
                  View
                </Button>
              </CardActions>
            </Card>
          </motion.div>
        ))}
      </List>
    </Box>
   </Box>
  );
};

export default JobList;
