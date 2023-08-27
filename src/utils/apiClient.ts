import axios, { AxiosRequestConfig } from 'axios';
import { getAccessToken, refreshAccessToken } from '../utils/auth';

type ResolveFunction = (value: unknown) => void;

const axiosDefaults = {
    baseURL: process.env.API_URL ?? '',
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
};

export const api = axios.create(axiosDefaults);
export const apiSecure = axios.create(axiosDefaults);
export const apiSecureRetry = axios.create(axiosDefaults);

const injectAccessToken = async (config: AxiosRequestConfig<unknown>) => {
    const token = getAccessToken();
    if (token) {
        config.headers['authorization'] = `Bearer ${token}`;
    }
    return config;
};

apiSecure.interceptors.request.use(injectAccessToken);
apiSecureRetry.interceptors.request.use(injectAccessToken);

let retryQueue: ((token: string) => void)[] = [];

const addRequestToRetryQueue = (resolve: ResolveFunction, config: AxiosRequestConfig<unknown>): void => {
    retryQueue.push((token) => {
        config.headers.authorization = `Bearer ${token}`;
        resolve(apiSecureRetry(config));
    });
};

let fetchingNewToken = false;

const retryFromQueue = (token: string) => {
    fetchingNewToken = false;
    retryQueue.forEach((callback) => callback(token));
    retryQueue = [];
};

apiSecure.interceptors.response.use(
    (response) => response,
    (error) => {
        return new Promise((resolve, reject) => {
            if (error.response.status === 401) {
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
