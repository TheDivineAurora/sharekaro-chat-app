// axiosConfig.js

import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.SERVER_URL || 'http://localhost:3000', // Use environment variable or default URL
});

export default axiosInstance;
