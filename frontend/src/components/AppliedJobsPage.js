import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Container, Grid, CircularProgress } from '@mui/material';
import jobApplicationsAPI from '../api/jobApplications';
import Header from './Header';

const AppliedJobPage = () => {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  useEffect(() => {
    const token = localStorage.getItem('token');

    const fetchJobApplications = async () => {
      try {
        const jobs = await jobApplicationsAPI.getAllJobApplications(token);
        setAppliedJobs(jobs);
      } catch (error) {
        console.error('Failed to fetch job applications', error);
      } finally {
        setIsLoading(false); // Set loading to false when data fetching is complete
      }
    };

    fetchJobApplications();
  }, []);

  return (
    <>
      <Header />
      <Container maxWidth="md" sx={{ mt: 5 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Applied Jobs
        </Typography>
        {isLoading ? (
          <Box display="flex" justifyContent="center" alignItems="center" sx={{ height: '60vh' }}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={3}>
            {appliedJobs.map((application, index) => (
              <Grid item xs={12} key={index}>
                <Paper elevation={3} sx={{ p: 3 }}>
                  <Typography variant="h6">{application.jobId.title}</Typography>
                  <Typography>Status: {application.status}</Typography>
                  <Typography>Date Applied: {application.appliedDate}</Typography>
                  <Typography>Company: {application.jobId.companyName}</Typography>
                  <Typography>Location: {application.jobId.location}</Typography>
                  <Typography>Description: {application.jobId.description}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </>
  );
};

export default AppliedJobPage;
