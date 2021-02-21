import axios from 'axios';

const axiosClient = axios.create({
    baseURL: process.env.backendURL
});

export default axiosClient;