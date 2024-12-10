import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/Logo.jpeg'; // Ensure you have the logo image
import '../css/NavigationHeader.css'; // Import the CSS file

const NavigationHeader = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear the token or authentication state
    navigate('/login'); // Redirect to login page
  };

  return (
    <header className="header">
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
        <div className="brand-name">MERN Mavericks</div>
      </div>
      <nav>
        <ul className="nav-links">
          <li>
            <Link to="/navigation">Jobs</Link>
          </li>
          <li>
            <Link to="/applied-jobs">Applied Jobs</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <button onClick={handleLogout} className="logout-button">Logout</button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default NavigationHeader;
