import React, { useContext, useState } from 'react';
import { Avatar, Box, IconButton, Menu, MenuItem, Toolbar, Typography, useTheme } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContextProvider';
import { ThemeToggleContext } from '../theme/GlobalThemeProvider';
import MuiAppBar from '@mui/material/AppBar';
import styled from '@mui/material/styles/styled';

const NavBar = () => {
  const navigate=useNavigate()
  const theme = useTheme();
  const { isLoggedIn, user, logout } = useContext(AuthContext); // Assuming `logout` function exists in your context
  const { toggleSideNav } = useContext(ThemeToggleContext);

  
  const [anchorEl, setAnchorEl] = useState(null);
  
 
  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  
  const handleLogout = () => {
    setAnchorEl(null);
    logout(); 
    navigate("/")
    
  };

  const AppBar = styled(MuiAppBar)(({ theme }) => ({
    zIndex: theme.zIndex.drawer + 1,
    boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.02)',
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  }));

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ backgroundColor: theme.palette.primary.darker }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Orchasp Limited
          </Typography>
          <Box>
            <Typography
              sx={{ textTransform: 'lowercase', mr: 2, textDecoration: 'none' }}
              color="inherit"
              component={Link}
              to={"/"}
            >
              Home
            </Typography>
          </Box>

          {!isLoggedIn && (
            <Box>
              <Typography
                sx={{ textTransform: 'lowercase', mr: 2, textDecoration: 'none' }}
                color="inherit"
                component={Link}
                to={"login"}
              >
                Login
              </Typography>
            </Box>
          )}

          {isLoggedIn && (
            <Box>
              <IconButton onClick={handleAvatarClick} sx={{ p: 0 }}>
                <Avatar sx={{ ml: 1, width: '40px', height: '40px', color: 'blue' }}>
                  {user.userName.charAt(0).toUpperCase()}
                </Avatar>
              </IconButton>

              
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                PaperProps={{
                  elevation: 3,
                  sx: {
                    mt: '45px',
                    minWidth: '200px',
                    boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.1)',
                    ml:160
                  },
                }}
              >
                <MenuItem onClick={handleLogout} >Logout</MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
