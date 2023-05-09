import axios from 'axios';

const API_URL = process.env.REACT_APP_API;
const token = localStorage.getItem('token');

const axiosConfig = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export default axiosConfig;
