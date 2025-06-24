import axios, { AxiosInstance } from 'axios';

export const BASE_URL = 'http://localhost:3000/api';

const api: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
});

export default api;
