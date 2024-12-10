import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert, Spinner } from 'react-bootstrap';
import logo from '../assets/Registration.jpeg'; 
import { useNavigate } from 'react-router-dom';
import userApi from '../api/userAPi'; 
import Header from './Header'; 
import '../css/RegisterPage.css';

function RegisterPage() {
  const [userType, setUserType] = useState('jobSeeker');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [companyAddress, setCompanyAddress] = useState('');
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
    if (!name || !email || !password || (userType === 'employer' && (!companyName || !companyAddress))) {
      setErrorMessage('Please fill in all required fields.');
      setLoading(false); // Reset loading if there's an error
      return;
    }

    try {
      const userData = { userType, name, email, password, companyName, companyAddress };
      await userApi.register(userData);
      setSuccessMessage('Registration successful! Redirecting to login...');
      setTimeout(() => {
        navigate('/login');
      }, 500);
    } catch (error) {
      setErrorMessage('Registration failed. Please try again.');
      console.error(error);
    } finally {
      setLoading(false); // Reset loading when submission is complete
    }
  };

  return (
    <>
      <Header />
      <Container className="register-container mt-5">
        <Row className="align-items-center">
          <Col md={6} className="d-none d-md-block">
            <img src={logo} alt="Logo" className="img-fluid larger-logo" />
          </Col>
          <Col md={6}>
            <h2 className="text-center mb-4">Register</h2>
            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
            {successMessage && <Alert variant="success">{successMessage}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formUserType">
                <Form.Label>User Type</Form.Label>
                <Form.Control 
                  as="select" 
                  value={userType} 
                  onChange={(e) => setUserType(e.target.value)}
                >
                  <option value="jobSeeker">Job Seeker</option>
                  <option value="employer">Employer</option>
                </Form.Control>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  isInvalid={!name && errorMessage}
                />
                <Form.Control.Feedback type="invalid">Name is required.</Form.Control.Feedback>
              </Form.Group>
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
              {userType === 'employer' && (
                <>
                  <Form.Group className="mb-3" controlId="formCompanyName">
                    <Form.Label>Company Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter company name"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      isInvalid={!companyName && errorMessage}
                    />
                    <Form.Control.Feedback type="invalid">Company Name is required.</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formCompanyAddress">
                    <Form.Label>Company Address</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter company address"
                      value={companyAddress}
                      onChange={(e) => setCompanyAddress(e.target.value)}
                      isInvalid={!companyAddress && errorMessage}
                    />
                    <Form.Control.Feedback type="invalid">Company Address is required.</Form.Control.Feedback>
                  </Form.Group>
                </>
              )}
              <Button variant="primary" type="submit" className="w-100" disabled={loading}>
                {loading ? <Spinner animation="border" size="sm" /> : 'Register'}
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

export default RegisterPage;
