import { axiosClient, axiosSecureClient } from '../common/api';
import { getStorage, setStorage } from '../utils/localStorage';

export const TOKEN_KEY = 'access-token';
export const TOKEN_EXPIRY_KEY = 'access-token-expiry';

export type User = {
    id: string;
    fullName?: string;
    roles?: string[];
    hashedPassword?: string;
};

export type IdAndAccessToken = {
    id: string,
    accessToken: string,
    accessTokenExpiry: number;
};

export const getAccessToken = (): { accessToken: string, accessTokenExpiry: number } => {
    const accessToken = getStorage(TOKEN_KEY);
    const accessTokenExpiry = parseInt(getStorage(TOKEN_EXPIRY_KEY) || '0');
    return { accessToken, accessTokenExpiry };
};

const setAccessToken = (token: string, expiry: number): void => {
    setStorage(TOKEN_KEY, token);
    setStorage(TOKEN_EXPIRY_KEY, expiry.toString());
};

export const login = async (userId: string, password: string): Promise<void> => {
    const response = await axiosClient.post<IdAndAccessToken>('auth/login', { id: userId, password });
    const { accessToken, accessTokenExpiry } = response.data;
    setAccessToken(accessToken, accessTokenExpiry);
    console.log('logged in');
};

export const logout = async (): Promise<void> => {
    await axiosClient.post('auth/logout');
    setAccessToken('', 0);
    console.log('logged out');
};

export const refreshAccessToken = async (): Promise<void> => {
    try {
        const loggedUserInfo = (await axiosClient.post('auth/refresh')).data;
        const { accessToken, accessTokenExpiry } = loggedUserInfo;
        setAccessToken(accessToken, accessTokenExpiry);
        console.log('access token refreshed');
    } catch (e) {
        console.log('Error', e);   
        setAccessToken('', 0);
    }
};

export const getUserInfo = async (): Promise<User> => {
    const { data } = await axiosSecureClient.get<User>('auth/get-user-info');
    return data;
};
