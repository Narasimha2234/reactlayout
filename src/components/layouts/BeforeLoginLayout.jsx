import React from 'react';
import { Outlet } from 'react-router-dom';

import { Box } from '@mui/material';
import NavBar from '../NavBar';
import Footer from '../pages/public/Footer';

const BeforeLoginLayout = () => {
  return (
    <Box>
      <NavBar/>
      <Box sx={{ minHeight: '100vh',p:5 ,mt:5}}>
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
};

export default BeforeLoginLayout;
