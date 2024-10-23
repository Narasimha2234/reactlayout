import React from 'react';
import { Outlet } from 'react-router-dom';

import { Box } from '@mui/material';
import NavBar from '../NavBar';


const BeforeLoginLayout = () => {
  return (
    <Box>
      <NavBar/>
      <Box sx={{ height: '90vh',mt:8
        }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default BeforeLoginLayout;
