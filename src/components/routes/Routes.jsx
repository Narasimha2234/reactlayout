import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import BeforeLoginLayout from '../layouts/BeforeLoginLayout';
import Home from '../pages/public/Home';
import Login from '../pages/public/Login';
import AfterLoginLayout from '../layouts/AfterLoginLayout';
import RegisterPage from '../pages/public/RegisterPage';
import JobList from '../pages/private/JobList';
import JobDetail from '../pages/private/JobView';
import JobApplicationForm from '../pages/private/ApplicationForm';
import PrivateRoute from '../pages/private/PrivateRoute';


const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route  element={<BeforeLoginLayout />}>
          <Route path="home"  element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>

        {/* Protected Routes */}
        <Route path='orchasp/careers' element={<PrivateRoute><AfterLoginLayout /></PrivateRoute>}>
          <Route path='list' element={<JobList />} />
          <Route path='view' element={<JobDetail />} />
          <Route path='apply' element={<JobApplicationForm />} />
        </Route>
        
      </Routes>
    </Router>
  );
};

export default AppRoutes;
