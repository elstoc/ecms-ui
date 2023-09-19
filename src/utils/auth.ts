import { api } from './apiClient';
import { getStorage, setStorage } from './localStorage';

export const TOKEN_KEY = 'access-token';

export const getAccessToken = (): string => {
    return getStorage(TOKEN_KEY);
};

const setAccessToken = (token: string): void => {
    setStorage(TOKEN_KEY, token);
};

export const login = async (userId: string, password: string): Promise<void> => {
    const response = await api.post<{ id: string, accessToken: string, accessTokenExpiry: number; }>('auth/login', { id: userId, password });
    const { accessToken } = response.data;
    setAccessToken(accessToken);
    console.log('logged in');
};

export const logout = async (): Promise<void> => {
    await api.post('auth/logout');
    setAccessToken('');
    console.log('logged out');
};

export const refreshAccessToken = async (): Promise<string> => {
    try {
        const loggedUserInfo = (await api.post('auth/refresh')).data;
        const { accessToken } = loggedUserInfo;
        setAccessToken(accessToken);
        console.log('access token refreshed');
        return accessToken as string;
    } catch (e) {
        console.log('Error', e);   
        return '';
    }
};
