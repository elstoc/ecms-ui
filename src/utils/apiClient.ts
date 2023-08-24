import axios from 'axios';
import { getAccessToken, refreshAccessToken } from '../utils/auth';

const axiosDefaults = {
    baseURL: process.env.API_URL ?? '',
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
};

export const api = axios.create(axiosDefaults);
export const apiSecure = axios.create(axiosDefaults);

apiSecure.interceptors.request.use(
    async (config) => {
        const token = getAccessToken();
        if (token) {
            config.headers['authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

apiSecure.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequestConfig = error.config;
        if (error.response.status === 403 && !originalRequestConfig._retry) {
            originalRequestConfig._retry = true;
            const accessToken = await refreshAccessToken();
            originalRequestConfig.config.headers['authorization'] = `Bearer ${accessToken}`;
            return apiSecure(originalRequestConfig);
        }
        return Promise.reject(error);
    }
);
