import axios from 'axios';

const API_URL = 'https://job-board-backend-59cu.onrender.com/api/users/';
//const API_URL = 'http://localhost:5000/api/users/';
const register = async (userData) => {
  const response = await axios.post(API_URL + 'register', userData);
  return response.data;
};

const login = async (userData) => {
  const response = await axios.post(API_URL + 'login', userData);
  if (response.data.token) {
    localStorage.setItem('token', response.data.token); // Store the token
  }
  return response.data;
};

const updateUser = async (userData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(API_URL + `update/${userData.id}`, userData, config);
  return response.data;
};

const deleteUser = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(API_URL + `delete/${id}`, config);
  return response.data;
};

const getProfile = async () => {
  return await axios.get(`${API_URL}/profile`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
};

const updateProfile = async (profileData) => {
  return await axios.put(`${API_URL}/profile`, profileData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
};

export default {
  register,
  login,
  updateUser,
  deleteUser,
  getProfile,
  updateProfile,
};
