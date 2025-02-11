import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://task-management-board-cl09.onrender.com/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
