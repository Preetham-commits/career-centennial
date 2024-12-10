import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Alert, Spinner } from 'react-bootstrap';
import userApi from '../api/userAPi'; // Ensure the import path is correct
import NavigationHeader from './NavigationHeader';
import '../css/ProfilePage.css';

function ProfilePage() {
  const [user, setUser] = useState({});
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [companyAddress, setCompanyAddress] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await userApi.getProfile();
        setUser(response.data);
        setName(response.data.name);
        setEmail(response.data.email);
        setCompanyName(response.data.companyName);
        setCompanyAddress(response.data.companyAddress);
        setLoading(false); // Set loading to false once data is loaded
      } catch (error) {
        setErrorMessage('Failed to load user data');
        setLoading(false); // Set loading to false if there's an error
      }
    };

    fetchUserData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const updatedUserData = { name, email, companyName, companyAddress };
      await userApi.updateProfile(updatedUserData);
      setSuccessMessage('Profile updated successfully!');
    } catch (error) {
      setErrorMessage('Failed to update profile');
    }
  };

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center mt-5" style={{ height: '100vh' }}>
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  return (
    <>
      <NavigationHeader />
      <Container className="profile-container mt-5">
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <h2 className="text-center mb-4">Profile</h2>
            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
            {successMessage && <Alert variant="success">{successMessage}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              {user.userType === 'employer' && (
                <>
                  <Form.Group className="mb-3" controlId="formCompanyName">
                    <Form.Label>Company Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter company name"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formCompanyAddress">
                    <Form.Label>Company Address</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter company address"
                      value={companyAddress}
                      onChange={(e) => setCompanyAddress(e.target.value)}
                    />
                  </Form.Group>
                </>
              )}
              <Button variant="primary" type="submit" className="w-100">Update Profile</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default ProfilePage;
