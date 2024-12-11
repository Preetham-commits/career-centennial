import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert, Spinner } from 'react-bootstrap';
import logo from '../assets/Login.jpeg'; 
import { useNavigate } from 'react-router-dom';
import userApi from '../api/userAPi';
import Header from './Header'; 
import '../css/LoginPage.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false); // Add loading state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    setLoading(true); // Set loading to true when submission starts

    // Basic validation
    if (!email || !password) {
      setErrorMessage('Please fill in all required fields.');
      setLoading(false); // Reset loading if there's an error
      return;
    }

    try {
      const userData = { email, password };
      const response = await userApi.login(userData);
      setSuccessMessage('Login successful! Redirecting to home page...');
      localStorage.setItem('token', response.token); // Store the token
      localStorage.setItem('userType', response.userType);
      setTimeout(() => {
        if (response.userType === 'jobSeeker')
          navigate('/navigation');
        else
          navigate('/employer-dashboard');
      }, 500);
      console.log('Login successfully');
    } catch (error) {
      setErrorMessage('Login failed. Please check your email and password.');
      console.error(error);
    } finally {
      setLoading(false); // Reset loading when submission is complete
    }
  };

  return (
    <>
      <Header />
      <Container className="login-container mt-5">
        <Row className="align-items-center">
          <Col md={6} className="d-none d-md-block">
            <img src={logo} alt="Logo" className="img-fluid larger-logo" />
          </Col>
          <Col md={6}>
            <h2 className="text-center mb-4">Login</h2>
            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
            {successMessage && <Alert variant="success">{successMessage}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  isInvalid={!email && errorMessage}
                />
                <Form.Control.Feedback type="invalid">Email is required.</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  isInvalid={!password && errorMessage}
                />
                <Form.Control.Feedback type="invalid">Password is required.</Form.Control.Feedback>
              </Form.Group>
              <Button variant="primary" type="submit" className="w-100" disabled={loading}>
                {loading ? <Spinner animation="border" size="sm" /> : 'Login'}
              </Button>
            </Form>
          </Col>
        </Row>
        {loading && (
          <div className="loading-overlay">
            <Spinner animation="border" variant="primary" />
          </div>
        )}
      </Container>
    </>
  );
}

export default LoginPage;
