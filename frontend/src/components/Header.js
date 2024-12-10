import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/Logo.jpeg'; // Ensure you have the logo image
import '../css/Header.css'; // Import the CSS file

const Header = () => {
  
  const [loginOpts, setLoginOpts] = useState(false);
  const [dashboardUrl, setDashboardUrl] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setLoginOpts(true);
    }
  }, []);

  useEffect(() => {
    const userType = localStorage.getItem('userType')?.replace(/"/g, '');

    if (userType === 'employer') {
      setDashboardUrl('/employer-dashboard');
    } else {
      setDashboardUrl('/navigation');
    }
  }, []);

  return (
    <header className="header">
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
        <div className="brand-name">MERN Mavericks</div>
      </div>
      <nav>
        <ul className="nav-links">
        {!loginOpts && (localStorage.getItem('userType') === 'jobSeeker') && (
          <li>
            
          
            <Link to="/">Home</Link>
            
          </li>
          )}
           {loginOpts && (
            <li>
              <Link to={dashboardUrl}>Dashboard</Link>
            </li>
          )}
          {loginOpts && (
            <li>
              {
                localStorage.getItem('userType') && localStorage.getItem('userType')?.replace(/"/g, '') === 'employer'
                  ? <Link to='/accepted-applications'>Applications</Link>
                  : <Link to="/applied-jobs">Applied Jobs</Link>
              }
            </li>
          )}

         
          {loginOpts && (localStorage.getItem('userType') === 'employer') && (
            <li>


              <Link to="/create-job">create-job</Link>

            </li>
          )}
          {loginOpts && (
            <li>
              <Link to='/logout'>Logout</Link>
            </li>
          )}

          {!loginOpts && (
            <li>
              <Link to="/login">Login</Link>
            </li>
          )}
          {!loginOpts && (
            <li>
              <Link to="/register">Register</Link>
            </li>
          )}
          {/* <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li> */}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
