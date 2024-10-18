import React from 'react';
import { Breadcrumbs, Link, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';





const CustomBreadCrumbs = () => {
  const location = useLocation();
  const navigate = useNavigate();

 
  const pathSegments = location.pathname.split('/').filter((segment) => segment);
  console.log(pathSegments);
  
  
  const breadcrumbItems = pathSegments.map((segment, index) => {
    const path = `/${pathSegments.slice(0, index + 1).join('/')}`;
    return {
      label: segment.charAt(0).toUpperCase() + segment.slice(1),
      path,
    };
  });

  return (
    <Breadcrumbs aria-label="breadcrumb">
     
      <Link
        color="inherit"
        onClick={() => navigate('/')}
        sx={{
          cursor: 'pointer',
          textDecoration: 'none',
          '&:hover': {
            textDecoration: 'underline',
          },
        }}
      >
        Home
      </Link>

     
      {breadcrumbItems.map((item, index) => (
        index < breadcrumbItems.length - 1 ? (
          
          <Link
            key={index}
            color="inherit"
            onClick={() => navigate(item.path)}
            sx={{
              cursor: 'pointer',
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline',
              },
            }}
          >
            {item.label}
          </Link>
        ) : (
         
          <Typography key={index} color="text.primary">
            {item.label}
          </Typography>
        )
      ))}
    </Breadcrumbs>
  );
};

export default CustomBreadCrumbs;
