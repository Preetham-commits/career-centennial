import axios from 'axios';
import CreateJobPage from '../components/CreateJobPage';

//const API_URL = 'https://job-board-backend-59cu.onrender.com/api/jobPosts';
const API_URL = '/api/jobPosts';

const genHeaders = (token) => {
    return {
        headers: {
            authorization: `Bearer ${token}`,
        }
    };
};

export const getAllJobPosts = async (token) => {
    const opts = genHeaders(token);
    const response = await axios.get(`${API_URL}/employerjobs`, opts);
    return response.data;
};

export const getJobPostById = async (token, id) => {
    const opts = genHeaders(token);
    const response = await axios.get(`${API_URL}/${id}`, opts); // Added "/" before id
    return response.data;
};

export const createJobPost = async (token, jobPostData) => {
    const opts = genHeaders(token);
    console.log({ body: jobPostData, ...opts });
    const response = await axios.post(API_URL, jobPostData, opts);
    return response.data;
};

export const updateJobPost = async (token, id, jobPostData) => {
    const opts = genHeaders(token);
    const response = await axios.put(`${API_URL}/${id}`, jobPostData, opts); // Added "/" before id
    return response.data;
};

export const deleteJobPost = async (token, id) => {
    const opts = genHeaders(token);
    const response = await axios.delete(`${API_URL}/${id}`, opts); // Added "/" before id
    return response.data;
};

export const getJobs = async () => {
    const token = localStorage.getItem('token');
    return await axios.get(`${API_URL}/jobs`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const getJobDetails = async (jobId) => {
    const token = localStorage.getItem('token');
    return await axios.get(`${API_URL}/jobs/${jobId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const submitApplication = async (applicationData) => {
    const token = localStorage.getItem('token');
    return await axios.post(
        `${API_URL}/jobs/${applicationData.jobId}/apply`,
        applicationData,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
};

export const getAppliedJobs = async () => {
    const token = localStorage.getItem('token');
    return await axios.get(`${API_URL}/applied-jobs`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};
export default {createJobPost, getAllJobPosts, getJobPostById, updateJobPost, deleteJobPost, getJobs, getJobDetails, submitApplication, getAppliedJobs };
