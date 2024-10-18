import React, { useContext } from 'react';
import { AppBar, Box, Button, IconButton, styled, Toolbar, Typography, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import MuiAppBar from '@mui/material/AppBar';
import { ThemeToggleContext } from '../theme/GlobalThemeProvider';
import { Link, useLocation } from 'react-router-dom';

const NavBar = () => {
  const theme = useTheme();
  const path=useLocation()
  const isLoggedIn= path.pathname!=="/" &&path.pathname!=="/about" && path.pathname!=="/login" 
  console.log(isLoggedIn);
  
  const { toggleSideNav } = useContext(ThemeToggleContext);

  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })(({ theme }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.02)',

    variants: [
      {
        props: ({ open }) => open,
        style: {
          transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        },
      },
    ],
  }));


  return (
    <Box sx={{flexGrow:1}}>
      <AppBar position="fixed" color={theme.palette.grey[800]}  sx={{backgroundColor:theme.palette.common.white}}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={toggleSideNav}
            edge="start"
            sx={[
              {
                marginRight: 5,
              },

            ]}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
        
        {!isLoggedIn &&( <Box>
         <Typography sx={{textTransform:"lowercase" , mr:2 ,textDecoration:"none",
          "&:hover":{
            color:theme.palette.action.active,
            cursor:"pointer"
          }
         }}
          color="inherit"
           component={Link} to={"/"}>
            Home
          </Typography>
          <Typography sx={{textTransform:"lowercase" , mr:2 ,textDecoration:"none",
          "&:hover":{
            color:theme.palette.action.active,
             cursor:"pointer"
          }
         }} color="inherit"
         component={Link} to={"about"}
         >About</Typography>
           <Typography sx={{textTransform:"lowercase" , mr:2 ,textDecoration:"none",
          "&:hover":{
            color:theme.palette.action.active,
             cursor:"pointer"
          }
         }} color="inherit"
         component={Link} to={"login"}
         >Login</Typography>
         </Box>)}
        

        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
