import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BeforeLoginLayout from '../layouts/BeforeLoginLayout';
import Home from '../pages/public/Home';
import About from '../pages/public/About';
import Login from '../pages/public/Login';
import AfterLoginLayout from '../layouts/AfterLoginLayout';
import Dashboard from '../pages/private/Dashboard';
import Profile from '../pages/private/Profile';
import Member from '../pages/private/Member';
import LabReports from '../pages/private/LabReports';
import RegisterPage from '../pages/public/RegisterPage';


const AppRoutes = () => {
  return (
    <Router>
      <Routes>

        <Route  element={<BeforeLoginLayout />}>
          <Route path="" element={<Home />} />
          <Route path="about" element={< About/>} />
          <Route path="login" element={<Login/>} />
          <Route path='register' element={<RegisterPage/>}/>
        </Route>

        
        <Route element={<AfterLoginLayout/>}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="members" element={<Member />} />
          <Route path="lab-reports" element={<LabReports />} />

        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
