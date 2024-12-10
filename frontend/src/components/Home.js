import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import logo from '../assets/Logo.jpeg';
import Footer from './Footer'
import Header from './Header'; 

function Home() {
  return (
    <>
     <Header />
    <Container fluid className="text-center mt-5">
      <Row>
        <Col>
          <img src={logo} alt="Logo" className="mb-4" style={{ width: '150px' }} />
          <h1>Welcome to the Job Board</h1>
          <p>Your gateway to finding the perfect job</p>
          <Button variant="primary" as={Link} to="/login">Login</Button>
          <Button variant="secondary" as={Link} to="/register" className="ms-2">Register</Button>
        </Col>
      </Row>
    </Container>
    <Footer />
    </>
  );
}

export default Home;
