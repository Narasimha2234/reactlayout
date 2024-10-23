

import { Box } from '@mui/material';

import SideNav from './../SideNav';
import NavBar from './../NavBar';
import { Outlet } from 'react-router-dom';


const AfterLoginLayout = () => {
  return (
    <Box sx={{  minHeight: '90vh' }}>
      <NavBar />
      {/* <SideNav  /> */}
      <Box
        component="main"
        sx={{   mt: 10 ,}}
      >
               <Outlet />  
      </Box>
    </Box>
  );
};

export default AfterLoginLayout;
