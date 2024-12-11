import React,{ useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import AboutUs from './components/Aboutus';
import { useNavigate } from 'react-router-dom';
import EmployerDashboard from './components/EmployerDashboard.js';
import ProfilePage from './components/ProfilePage';
import CreateJobPage from './components/CreateJobPage.js';
import AppliedJobsPage from './components/AppliedJobsPage.js';
import AcceptedApplications from './components/AcceptedApplications.js';
import ApplicationPage from './components/ApplicationPage';
import NavigationPage from './components/NavigationPage';

const App = () => {
  const userType = localStorage.getItem('userType'); // Retrieve userType from localStorage
  const Logout = () => {
    const navigate = useNavigate();
    useEffect(() => {
      localStorage.removeItem('token');
      localStorage.removeItem('userType');
      navigate('/register');
    }, []);
    return null;
  };
  // Helper Component to Redirect Based on UserType
  const ProtectedRoute = ({ children, allowedUserTypes }) => {
    const token = localStorage.getItem('token');
    const userType = localStorage.getItem('userType');
    console.log(userType);
    if (!token) {
      return <Navigate to="/login" />;
    }

    if (allowedUserTypes && !allowedUserTypes.includes(userType)) {
      return <Navigate to="/" />;
    }

    return children;
  };

  return (
    <Router>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/about" element={<AboutUs />} />
        
          
          <Route path="/logout" element={<Logout />} />
 <Route path="/employer-dashboard" element={<EmployerDashboard />} />
          <Route
            path="/profile"
            element={
              
                <ProfilePage />
             
            }
          />

          <Route
            path="/navigation"
            element={
              <ProtectedRoute allowedUserTypes={['jobSeeker']}>
                <NavigationPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/job/:jobId"
            element={
              <ProtectedRoute allowedUserTypes={['jobSeeker']}>
                <ApplicationPage />
              </ProtectedRoute>
            }
          />

          {/* Redirect if trying to access unknown routes */}
          <Route path="*" element={<Navigate to="/" />} />
<Route path="/create-job" element={<CreateJobPage />} />
          <Route path="/applied-jobs" element={<AppliedJobsPage />} />
          <Route path="/accepted-applications" element={<AcceptedApplications />} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;
