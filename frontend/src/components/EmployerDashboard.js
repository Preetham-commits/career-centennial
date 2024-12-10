import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import jobAPI from '../api/jobApi';
import Header from './Header';
import { Link } from 'react-router-dom';

const EmployerDashboard = () => {
    const [jobsList, setJobsList] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Add loading state

    useEffect(() => {
        jobAPI.getAllJobPosts(localStorage.getItem('token'))
            .then((data) => {
                setJobsList(data);
                console.log(data);
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => {
                setIsLoading(false); // Set loading to false when data fetching is complete
            });
    }, []);

    return (
        <>
            <Header />
            <Container className="mt-5">
                <Col>
                    <h2>Welcome to the Employer Dashboard</h2>
                    <p>
                        <Link to='/create-job'>Create</Link> & Manage jobs
                    </p>
                </Col>

                <Container style={{ marginTop: '2rem' }}>
                    <Col>
                        <h3>Your Job Posts</h3>
                    </Col>
                </Container>
                <Col>
                    {isLoading ? (
                        <div className="d-flex justify-content-center align-items-center" style={{ height: '60vh' }}>
                            <Spinner animation="border" />
                        </div>
                    ) : (
                        jobsList.map((job) => (
                            <Row key={job._id} style={{ border: '1px solid #ccc', padding: '1rem', marginTop: '1rem' }}>
                                <Col>
                                    <h4>{job.title}</h4>
                                    <p>{job.description}</p>
                                    <ul>
                                        <li>Location: {job.location}</li>
                                        <li>Deadline: {new Date(job.applicationDeadline).toString()}</li>
                                        <li>Salary Range: {job.salaryRange}</li>
                                        <li>Skills: {job.requiredSkills}</li>
                                    </ul>
                                </Col>
                            </Row>
                        ))
                    )}
                </Col>
            </Container>
        </>
    );
};

export default EmployerDashboard;
