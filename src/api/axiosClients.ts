import axios, { AxiosRequestConfig } from 'axios';
import { getAccessToken, refreshAccessToken } from './auth';
import { config } from '../utils/config';

const axiosDefaults = {
    baseURL: config.apiUrl,
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
    config.url = config.url?.replace(/\/$/, '');
    return config;
};

axiosSecureClient.interceptors.request.use(injectAccessToken);
axiosSecureClientRetry.interceptors.request.use(injectAccessToken);

let failedRequestRetryQueue: ((token: string) => void)[] = [];

const addFailedRequestToRetryQueue = (resolve: (value: unknown) => void, config: AxiosRequestConfig<unknown>): void => {
    failedRequestRetryQueue.push((token) => {
        config.headers.authorization = `Bearer ${token}`;
        resolve(axiosSecureClientRetry(config));
    });
};

let fetchingNewToken = false;

const retryFailedRequests = (token: string) => {
    fetchingNewToken = false;
    failedRequestRetryQueue.forEach((callback) => callback(token));
    failedRequestRetryQueue = [];
};

axiosSecureClient.interceptors.response.use(
    (response) => response,
    (error) => {
        return new Promise((resolve, reject) => {
            if (error.response?.status === 401) {
                addFailedRequestToRetryQueue(resolve, error.config);
                if (fetchingNewToken)
                    return;
                fetchingNewToken = true;
                refreshAccessToken()
                    .then((newToken) => retryFailedRequests(newToken));
            } else {
                reject(error);
            }
        });
    }
);
