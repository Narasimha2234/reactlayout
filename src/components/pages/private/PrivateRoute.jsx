import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../../auth/AuthContextProvider';


const PrivateRoute = ({ children }) => {
  const { isLoggedIn } = useContext(AuthContext); 

  return isLoggedIn ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
