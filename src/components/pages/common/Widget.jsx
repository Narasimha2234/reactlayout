import React from 'react';
import { Box, Paper, Typography } from '@mui/material';

const Widget = ({ title, icon, backgroundColor,color }) => {
  return (
    <Box component={Paper}
      sx={{
        backgroundColor: backgroundColor || 'warning.light',
        padding: '24px',
        borderRadius: '15px',
        color: color,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: "250px",
        opacity:0.8
      }}
    >
      
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 2, 
          fontSize: '48px',  
        }}
      >
        <img src={icon} alt={title} />
      </Box>
      
      
      <Typography
        variant="h6"
        sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: '18px', mt: 1 }}
      >
        {title}
      </Typography>
    </Box>
  );
};

export default Widget;
