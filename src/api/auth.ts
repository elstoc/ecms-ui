import { axiosClient, axiosSecureClient } from './axiosClients';
import { getStorage, setStorage } from '../utils/localStorage';

export const TOKEN_KEY = 'access-token';

export const getAccessToken = (): string => {
    return getStorage(TOKEN_KEY);
};

const setAccessToken = (token: string): void => {
    setStorage(TOKEN_KEY, token);
};

export const login = async (userId: string, password: string): Promise<void> => {
    const response = await axiosClient.post<{ id: string, accessToken: string, accessTokenExpiry: number; }>('auth/login', { id: userId, password });
    const { accessToken } = response.data;
    setAccessToken(accessToken);
    console.log('logged in');
};

export const logout = async (): Promise<void> => {
    await axiosClient.post('auth/logout');
    setAccessToken('');
    console.log('logged out');
};

export const refreshAccessToken = async (): Promise<string> => {
    try {
        const loggedUserInfo = (await axiosClient.post('auth/refresh')).data;
        const { accessToken } = loggedUserInfo;
        setAccessToken(accessToken);
        console.log('access token refreshed');
        return accessToken as string;
    } catch (e) {
        console.log('Error', e);   
        setAccessToken('');
        return '';
    }
};

type User = {
    id: string;
    fullName?: string;
    roles?: string[];
    hashedPassword?: string;
};

export const getUserInfo = async (): Promise<User> => {
    const { data } = await axiosSecureClient.get<User>('auth/get-user-info');
    return data;
};
