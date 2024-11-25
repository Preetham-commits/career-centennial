import axios from 'axios';
//const API_URL = 'https://job-board-backend-59cu.onrender.com/api/jobApplications/';
const API_URL = '/api/jobApplications/';
const genHeaders = (token) => {
    return {
        headers: {
            authorization: `Bearer ${token}`,
        }

    };
};

const jobApplicationsAPI = {
    async getAllJobApplications(token) {

        const opts = genHeaders(token);
        const response = await axios.get(API_URL, opts);
        return response.data;
    },

    
    async getJobApplicationById(token, id) {

        const opts = genHeaders(token);
        const response = await axios.get(`${API_URL}${id}`, opts);
        return response.data;
    },


    async createJobApplication(token, jobId, jobApplicationData) {

        const opts = genHeaders(token);
        const response = await axios.post(`${API_URL}apply/${jobId}`, jobApplicationData, opts);
        return response.data;
    },


    async updateJobApplication(token, id, jobApplicationData) {

        const opts = genHeaders(token);
        const response = await axios.put(`${API_URL}update/${id}`, jobApplicationData, opts);
        return response.data;
    },


    async deleteJobApplication(token, id) {

        const opts = genHeaders(token);
        const response = await axios.delete(`${API_URL}delete/${id}`, opts);
        console.log(response);
        return response.data;
    },

    async decideApplication(token, id, status) {
        const opts = genHeaders(token);
        const response = await axios.put(`${API_URL}status/${id}`, { status }, opts);
        return response.data;
    }
};

export default jobApplicationsAPI;
