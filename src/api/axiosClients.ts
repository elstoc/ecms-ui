import axios, { AxiosRequestConfig } from 'axios';
import { getAccessToken, refreshAccessToken } from './auth';

const axiosDefaults = {
    baseURL: process.env.API_URL ?? '',
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
};

export const axiosClient = axios.create(axiosDefaults);
export const axiosSecureClient = axios.create(axiosDefaults);

const axiosSecureClientRetry = axios.create(axiosDefaults);

const injectAccessToken = async (config: AxiosRequestConfig<unknown>) => {
    const token = getAccessToken();
    if (token) {
        config.headers['authorization'] = `Bearer ${token}`;
    }
    return config;
};

axiosSecureClient.interceptors.request.use(injectAccessToken);
axiosSecureClientRetry.interceptors.request.use(injectAccessToken);

let retryQueue: ((token: string) => void)[] = [];

const addRequestToRetryQueue = (resolve: (value: unknown) => void, config: AxiosRequestConfig<unknown>): void => {
    retryQueue.push((token) => {
        config.headers.authorization = `Bearer ${token}`;
        resolve(axiosSecureClientRetry(config));
    });
};

let fetchingNewToken = false;

const retryFromQueue = (token: string) => {
    fetchingNewToken = false;
    retryQueue.forEach((callback) => callback(token));
    retryQueue = [];
};

axiosSecureClient.interceptors.response.use(
    (response) => response,
    (error) => {
        return new Promise((resolve, reject) => {
            if (error.response?.status === 401) {
                addRequestToRetryQueue(resolve, error.config);
                if (fetchingNewToken)
                    return;
                fetchingNewToken = true;
                refreshAccessToken()
                    .then((newToken) => retryFromQueue(newToken));
            } else {
                reject(error);
            }
        });
    }
);
