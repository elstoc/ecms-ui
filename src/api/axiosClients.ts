import axios, { InternalAxiosRequestConfig } from 'axios';
import { getAccessToken, refreshAccessToken } from '../auth/api';
import { config } from '../utils/config';

const axiosDefaults = {
    baseURL: config.apiUrl,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
};

export const axiosClient = axios.create(axiosDefaults);
export const axiosSecureClient = axios.create(axiosDefaults);

let fetchingNewTokens = false;
let waitingForTokensQueue: (() => void)[] = [];

const finishWaitingRequests = () => {
    fetchingNewTokens = false;
    waitingForTokensQueue.forEach((cb) => cb());
    waitingForTokensQueue = [];
};

const resolveWithConfig = (config: InternalAxiosRequestConfig<unknown>, cb: (config: InternalAxiosRequestConfig<unknown>) => void) => {
    const { accessToken } = getAccessToken();
    if (accessToken) {
        config.headers['authorization'] = `Bearer ${accessToken}`;
    }
    config.url = config.url?.replace(/\/$/, '');
    cb(config);
};

const injectAccessToken = (config: InternalAxiosRequestConfig<unknown>): Promise<InternalAxiosRequestConfig> => {
    return new Promise((resolve) => {
        const { accessTokenExpiry } = getAccessToken();
        const tokenExpired = accessTokenExpiry && (accessTokenExpiry * 1000 < Date.now() + 10000);
        if (!tokenExpired) {
            resolveWithConfig(config, resolve);
        } else {
            waitingForTokensQueue.push(() => resolveWithConfig(config, resolve));
            if (!fetchingNewTokens) {
                fetchingNewTokens = true;
                refreshAccessToken()
                    .then(() => finishWaitingRequests());
            }
        }
    });
};

axiosSecureClient.interceptors.request.use(injectAccessToken);
