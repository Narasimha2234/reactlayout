

import { Box } from '@mui/material';

import SideNav from './../SideNav';
import NavBar from './../NavBar';
import { Outlet } from 'react-router-dom';


const AfterLoginLayout = () => {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <NavBar />
      <SideNav  />
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 5, mt: 5 ,}}
      >
               <Outlet />  
      </Box>
    </Box>
  );
};

export default AfterLoginLayout;
